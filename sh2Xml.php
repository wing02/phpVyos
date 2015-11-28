<?php
class Sh2Xml{
    
    var $dom ;
    var $data;
    var $tokens;
    var $i;

    public function __construct($data){
        $this->dom = new DomDocument( '1.0', 'utf-8' );
        $this->data = $data; 
    }

    public function sh2Xml() {
        $this->tokens = preg_split ( '/\s+/', $this->data );
        $root = $this->dom->createElement ( 'zone-policy' );
        $this->i = 0;
        $this->iterSh2Xml ( $root );
        $this->dom->appendchild($root);
        return $this->dom->saveXML();
    }

    private function iterSh2Xml($root) {
        while ( $this->i < count ( $this->tokens ) ) {
            if ($this->tokens[$this->i] == "{") {
                $this->i++;
                $this->iterSh2Xml ( $now );
                if ($this->i== count ( $this->tokens ))
                    return;
            } else if ($this->tokens [$this->i] == '}') {
                $this->i ++;
                return;
            } else {
                $now = $this->dom->createElement ( $this->tokens [$this->i] );
                $root->appendchild ( $now );
                $this->i ++;
                if ($this->tokens [$this->i] == '{' || $this->tokens [$this->i] == '}') {
                    continue;
                }
                if ($this->tokens[$this->i+1]=='{'){
                    $text=$this->dom->createElement('text');
                    $content=$this->dom->createTextNode($this->tokens[$this->i]);
                    $text->appendchild($content);
                    $now->appendchild($text);
                }else{
                    $text = $this->dom->createTextNode ( $this->tokens [$this->i] );
                    $now->appendchild ( $text );
                }
                $this->i ++;
            }
        }
    }

}
?>
