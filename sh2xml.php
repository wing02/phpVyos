<?php

$dom = new DomDocument ( '1.0', 'utf-8' );
$fp = fopen ( "shell", "r" );
$data = fread ( $fp, 4096 );
sh2Xml($data);
echo $dom->saveXML();

function sh2Xml($shStr) {
    global $tokens,$i,$dom;
    $tokens = preg_split ( '/\s+/', $shStr );
    $root = $dom->createElement ( 'zone-policy' );
    $i = 0;
    iterSh2Xml ( $root );
    $dom->appendchild($root);
    return $root;
}
function iterSh2Xml($root) {
    global $tokens,$i,$dom;
    while ( $i < count ( $tokens ) ) {
        if ($tokens[$i] == "{") {
            $i++;
            iterSh2Xml ( $now );
            if ($i== count ( $tokens ))
                return;
        } else if ($tokens [$i] == '}') {
            $i ++;
            return;
        } else {
            $now = $dom->createElement ( $tokens [$i] );
            $root->appendchild ( $now );
            $i ++;
            if ($tokens [$i] == '{' || $tokens [$i] == '}') {
                continue;
            }
            if ($tokens[$i+1]=='{'){
                $text=$dom->createElement('text');
                $content=$dom->createTextNode($tokens[$i]);
                $text->appendchild($content);
                $now->appendchild($text);
            }else{
                $text = $dom->createTextNode ( $tokens [$i] );
                $now->appendchild ( $text );
            }
            $i ++;
        }
    }
}

?>
