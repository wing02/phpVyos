
one.main.zonePolicy.dashlet = {
    zonePolicy : {
        id : 'leftTop',
        name : 'zonePolicy'
    },
    detail : {
        id : 'leftBottom',
        name : 'detail'
    }
};

one.main.zonePolicy.menu = {
    left : {
        top : [
            one.main.zonePolicy.dashlet.zonePolicy,
        ],
        bottom : [
            one.main.zonePolicy.dashlet.detail
        ]
    },
    right : {
        top : [
        ],
        bottom : [
        ]
    },
}

one.main.zonePolicy.show = function() {
    
    $("#main-bottom .nav").empty();
    $(one.main.zonePolicy.menu.left.top).each(function(){
        var $nav = $("#left-top .nav");
        one.lib.title($nav, this);
    });
    $(one.main.zonePolicy.menu.left.bottom).each(function(){
        var $nav = $(".nav", "#left-bottom");
        one.lib.title($nav, this);
    });
    $(one.main.zonePolicy.menu.right.top).each(function(){
        var $nav = $(".nav", "#right-top");
        one.lib.title($nav, this);
    });
    $(one.main.zonePolicy.menu.right.bottom).each(function(){
        var $nav = $(".nav", "#right-bottom");
        one.lib.title($nav, this);
    });
    $("li:first","#main-bottom ul").addClass('active');
    one.main.zonePolicy.leftTop();
}

one.main.zonePolicy.leftTop = function() {
    $.post("/getZonePolicy.php", {
    }, function(data, status) {
        $("#left-top .dashlet").empty();
        var $h4=one.lib.dashlet.header("zonePolicy");  
        $("#left-top .dashlet").append($h4);
        var $table=one.lib.dashlet.table.table(["table","table-striped","table-bordered","itable-condensed"]);
        var $thead=one.lib.dashlet.table.thead(["zone","interface","from","firewall"]);
        var tbody=new Array();
        var $zones=$("zone",$(data));
        for(var iZone=0;iZone<$zones.length;iZone++){
            var $zone=$($zones[iZone]);
            var $froms=$("from",$zone);
            if($froms.length==0){
                var $interfaces=$("interface",$zone);
                var interText="";
                var len=$interfaces.length;
                for(var iInterface=0;iInterface<$interfaces.length;iInterface++){
                    var $inter=$($interfaces[iInterface]);
                    interText=interText+$inter.text()+";";
                }
                tbody.push({
                    "entry":[ $("text:first",$zone).text(),interText," "," "

                    ]
                });
            }
            for(var iFrom=0;iFrom<$froms.length;iFrom++){
                var $interfaces=$("interface",$zone);
                var interText="";
                var len=$interfaces.length;
                for(var iInterface=0;iInterface<$interfaces.length;iInterface++){
                    var $inter=$($interfaces[iInterface]);
                    interText=interText+$inter.text()+";";
                }
                var $from=$($froms[iFrom]);
                var $names=$("name",$from);
                var firewallName="";
                for(var iName=0;iName<$names.length;iName++){
                    var $name=$($names[iName]);
                    firewallName=firewallName+$name.text()+";";
                }
                tbody.push({
                    "entry":[ $("text:first",$zone).text(),interText,$("text:first",$from).text(),firewallName
                    ]
                });
            }
        }
        $tbody=one.lib.dashlet.table.tbody(tbody);
        $table.append($thead).append($tbody);
        $("#left-top .dashlet").append($table);
    });
}

one.main.zonePolicy.leftTop2 = function() {
    $.post("/getZonePolicy.php", {
    }, function(data, status) {
        $("#left-top .dashlet").empty();

        var $table=$("<table></table>");
        var $thead=$("<thead><tr><th>zone</th><th>interface</th><th>from</th><th>firewall</th></tr></thead>");
        $table.attr("class","table table-striped");
        var $tbody=$("<tbody></tbody>");
        $table.append($thead).append($tbody);
        $tbody.attr("id","zone-policy-tbody");
        var $zones=$("zone",$(data));
        for(var iZone=0;iZone<$zones.length;iZone++){
            var $zone=$($zones[iZone]);
            var $froms=$("from",$zone);
            if($froms.length==0){
                var $tr=$("<tr></tr>");
                var $td1=$("<td></td>");
                $td1.text($("text:first",$zone).text());
                var $td2=$("<td></td>");
                var $interfaces=$("interface",$zone);
                var interText="";
                var len=$interfaces.length;
                for(var iInterface=0;iInterface<$interfaces.length;iInterface++){
                    var $inter=$($interfaces[iInterface]);
                    interText=interText+$inter.text()+";";
                }
                $td2.text(interText);
                var $td3=$("<td></td>");
                var $td4=$("<td></td>");
                $tr.append($td1).append($td2).append($td3).append($td4);
                $tbody.append($tr);
            }
            for(var iFrom=0;iFrom<$froms.length;iFrom++){
                var $tr=$("<tr></tr>");
                var $td1=$("<td></td>");
                $td1.text($("text:first",$zone).text());
                var $td2=$("<td></td>");
                var $interfaces=$("interface",$zone);
                var interText="";
                var len=$interfaces.length;
                for(var iInterface=0;iInterface<$interfaces.length;iInterface++){
                    var $inter=$($interfaces[iInterface]);
                    interText=interText+$inter.text()+";";
                }
                $td2.text(interText);
                var $from=$($froms[iFrom]);
                var $td3=$("<td></td>");
                $td3.text($("text:first",$from).text());
                var $td4=$("<td></td>");
                var $names=$("name",$from);
                var firewallName="";
                for(var iName=0;iName<$names.length;iName++){
                    var $name=$($names[iName]);
                    firewallName=firewallName+$name.text()+";";
                }
                $td4.text(firewallName);
                $tr.append($td1).append($td2).append($td3).append($td4);
                $tbody.append($tr);
            }
        }
        $("#left-top .dashlet").append($table);
    });
}

//DO
$("#zonePolicy a").click(one.main.zonePolicy.show);
