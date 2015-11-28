<?php

require 'sh2Xml.php';

$data = shell_exec('cat shell');
$zonePolicy=new Sh2Xml($data);

header('Content-Type: text/xml');
echo $zonePolicy->sh2Xml();

?>
