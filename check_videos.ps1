$ids = @('N7b7uMIeigU','QXeEoD0pB3E','TmhQCQr_DCA','Vl0H-qT87tE','2eWuYf-aZE4','S2Y2IPwD77Q','ua-CiDNNj30','vK1E-mG0lXw','HpgZ5GP4yHM')
foreach ($vid in $ids) {
    try {
        $url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json"
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        $title = ($resp.Content | ConvertFrom-Json).title
        Write-Output "$vid -> OK: $title"
    } catch {
        Write-Output "$vid -> BROKEN"
    }
}
