$ErrorActionPreference = 'Stop'
$targetDir = Join-Path $PSScriptRoot '..\design-reference\khasaut\assets\inner'
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
$downloads = @(
  @{ Name = 'excursion-dzhily-su.jpg'; Url = 'https://static.tildacdn.com/tild3638-3030-4463-b531-386435653161/photo_13_2026-03-09_.jpg' },
  @{ Name = 'excursion-bermamyt.jpg'; Url = 'https://static.tildacdn.com/tild6438-3661-4666-b964-643936336164/32b3aa6dda297decab79.jpg' },
  @{ Name = 'excursion-bermamyt-dzhily-su.jpg'; Url = 'https://static.tildacdn.com/tild3064-3533-4330-a535-353734666234/d9ecf9d2-3534-4793-8.jpg' },
  @{ Name = 'excursion-dombay.jpg'; Url = 'https://static.tildacdn.com/tild3832-6166-4136-b936-396563383165/1110433_main.jpg' },
  @{ Name = 'excursion-arkhyz.jpg'; Url = 'https://static.tildacdn.com/tild3134-3163-4534-b432-363337326237/5000x3333_0xx3aaxVQp.jpg' },
  @{ Name = 'excursion-elbrus.jpg'; Url = 'https://static.tildacdn.com/tild6137-3865-4462-b061-353466363435/tren_base15-1.jpg' },
  @{ Name = 'excursion-aktoprak.jpg'; Url = 'https://static.tildacdn.com/tild3965-6436-4735-a232-313230646261/12065810.jpg' },
  @{ Name = 'excursion-balkaria.jpg'; Url = 'https://static.tildacdn.com/tild3734-3731-4364-b933-626235316634/979e1bdf-b58c-46a2-a.jpg' },
  @{ Name = 'excursion-ossetia.jpg'; Url = 'https://static.tildacdn.com/tild3063-6332-4661-b865-353466346432/eaeexzpJABAkaNB5CKjC.jpg' },
  @{ Name = 'excursion-ingushetia.jpg'; Url = 'https://static.tildacdn.com/tild6665-3062-4037-a535-323638326633/79999a65-9a08-49e2-a.jpg' },
  @{ Name = 'excursion-grozny.jpg'; Url = 'https://static.tildacdn.com/tild3936-6531-4239-a563-343737393263/13D9FAC3-956D-4514-9.jpeg' },
  @{ Name = 'excursion-narzan-valley.jpg'; Url = 'https://static.tildacdn.com/tild6634-3735-4233-a564-653766623638/Z_Bg7gwxz_JYcJrwMmli.jpg' },
  @{ Name = 'route-khurla-kol.webp'; Url = 'https://static.tildacdn.com/tild6438-3462-4239-a263-623662623530/img_3624.webp' },
  @{ Name = 'route-khudes-labyrinth.jpg'; Url = 'https://static.tildacdn.com/tild3235-3637-4564-a163-333436323931/jG8h7ZZ-p1RBm-ftGZAX.jpg' },
  @{ Name = 'route-mukhinskoe.jpg'; Url = 'https://static.tildacdn.com/tild3838-3266-4335-b862-383537633239/dji_0507.jpg' },
  @{ Name = 'route-makhar.jpg'; Url = 'https://static.tildacdn.com/tild3161-3637-4638-a536-356535316337/523091_main.jpg' },
  @{ Name = 'route-baduk-lakes.jpg'; Url = 'https://static.tildacdn.com/tild6137-3865-4462-b061-353466363435/tren_base15-1.jpg' },
  @{ Name = 'horse-hero.jpg'; Url = 'https://static.tildacdn.com/tild3061-3533-4762-b036-636365653361/4868e1d7-fc26-4cad-b.jpg' },
  @{ Name = 'horse-forest.jpg'; Url = 'https://static.tildacdn.com/tild6435-3062-4362-b337-633134666163/b18bd024-1d3b-11ec-9.jpg' },
  @{ Name = 'horse-meadow.jpg'; Url = 'https://static.tildacdn.com/tild6531-3265-4338-a330-336333323063/IMG-20220803-WA0016.jpg' },
  @{ Name = 'thermal-suvorovskie.jpg'; Url = 'https://static.tildacdn.com/tild3666-3866-4130-b264-373734393864/22201471-076a-4fe9-b.jpg' },
  @{ Name = 'thermal-pearl.webp'; Url = 'https://static.tildacdn.com/tild6638-3337-4235-b432-343236653733/photo.webp' },
  @{ Name = 'thermal-geduko.jpg'; Url = 'https://static.tildacdn.com/tild6164-3137-4235-b661-663864653232/109z0g9F02TzVhu3K8sA.jpg' },
  @{ Name = 'thermal-aushiger.jpg'; Url = 'https://static.tildacdn.com/tild3733-3564-4362-a231-306431393263/SsGrZEdFBxmpXRdadizM.jpg' }
)
foreach ($item in $downloads) {
  $outFile = Join-Path $targetDir $item.Name
  Invoke-WebRequest -Uri $item.Url -OutFile $outFile -UseBasicParsing
}
Get-ChildItem -LiteralPath $targetDir -File | Select-Object Name, Length
