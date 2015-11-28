one.menu={};

one.menu.name=[
{id:'cluster',
    name:'cluster'},
{id:'firewall',
    name:'firewall'},
{id:'interfaces',
    name:'interfaces'},
{id:'loadBalancing',
    name:'loadBalancing'},
{id:'nat',
    name:'nat'},
{id:'policy',
    name:'policy'},
{id:'protocols',
    name:'protocols'},
{id:'service',
    name:'service'},
{id:'system',
    name:'system'},
{id:'trafficPolicy',
    name:'trafficPolicy'},
{id:'vpn',
    name:'vpn'},
{id:'zonePolicy',
    name:'zonePolicy'},
]

//DO
$(one.menu.name).each(function(){
    var $nav = $(".nav", "#main-top");
    one.lib.title($nav, this);
});
$("li:first","#main-top ul").addClass('active');
