# ==============================================================================
# Servidor HTTP Local para APEX Supplements
# Corre el proyecto en http://localhost:8080 y evita errores de CORS en modulos ES
# ==============================================================================

$port = 8080
$url = "http://localhost:$port/"
$localPath = $PSScriptRoot

if (-not $localPath) {
    $localPath = Get-Location
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "  APEX SUPPLEMENTS - SERVIDOR LOCAL ACTIVO" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "Servidor web escuchando en: $url" -ForegroundColor Green
    Write-Host "Abriendo tu navegador predeterminado..." -ForegroundColor Gray
    Write-Host "Presiona [Ctrl + C] en esta consola para detener." -ForegroundColor Yellow
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host ""

    # Abrir navegador automaticamente
    Start-Process $url

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Obtener ruta relativa del archivo solicitado
        $relativePath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($relativePath)) {
            $relativePath = "index.html"
        }

        # Resolver ruta absoluta del archivo
        $filePath = Join-Path $localPath $relativePath
        
        # Validar si el archivo existe y es un archivo individual (no un directorio)
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Asignar el tipo de contenido mime-type adecuado
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            switch ($ext) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".css"  { $contentType = "text/css" }
                ".js"   { $contentType = "application/javascript; charset=utf-8" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".gif"  { $contentType = "image/gif" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".ico"  { $contentType = "image/x-icon" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Retornar 404 si no existe
            $response.StatusCode = 404
            $errMessage = "Error 404: Archivo no encontrado - $relativePath"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errMessage)
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error iniciando el servidor: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
