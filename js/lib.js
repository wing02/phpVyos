var one = {
    global :{},
}

one.lib={};
one.main={
    cluster:{},
    firewall:{},
    interfaces:{},
    loadBalancing:{},
    nat:{},
    policy:{},
    protocols:{},
    service:{},
    system:{},
    trafficPolicy:{},
    vpn:{},
    zonePolicy:{}
};


one.lib.title = function($nav, dashlet) {
    var $li = $(document.createElement('li'));
    var $a = $(document.createElement('a'));
    $a.text(dashlet.name);
    $li.attr('id', dashlet.id);
    $a.attr('href', '#');
    $a.attr('data-toggle', 'tab');
    $li.append($a);
    $nav.append($li);
}

one.lib.dashlet = {
    empty : function($dashlet) {
        $dashlet.empty();
    },
    append : function($dashlet, $content) {
        $dashlet.append($content);
    },
    header : function(header) {
        var $h4 = $(document.createElement('h4'));
        $h4.text(header);
        return $h4;
    },
    label : function(name, type) {
        var $span = $(document.createElement('span'));
        $span.addClass('label');
        if (type !== undefined) {
            $span.addClass(type);
        } else if (type !== null) {
            $span.addClass('label-info');
        }
        $span.append(name);
        return $span;
    },
    list : function(list) {
        var $ul = $(document.createElement('ul'));
        $(list).each(function(index, value) {
            var $li = $(document.createElement('li'));
            $li.append(value);
            $ul.append($li);
        });
        return $ul;
    },
    button : {
        config : function(name, id, type, size) {
            var button = {};
            button['name'] = name;
            button['id'] = id;
            button['type'] = type;
            button['size'] = size;
            return button;
        },
        single : function(name, id, type, size) {
            var buttonList = [];
            var button = one.lib.dashlet.button.config(name, id, type, size);
            buttonList.push(button);
            return buttonList;
        },
        button : function(buttonList) {
            var $buttonGroup = $(document.createElement('div'));
            $buttonGroup.addClass("btn-group");
            $(buttonList).each(function(index, value) {
                var $button = $(document.createElement('button'));
                $button.text(value.name);
                $button.addClass('btn');
                $button.addClass(value['type']);
                $button.addClass(value['size']);
                if (!(typeof value.id === 'undefined')) {
                    $button.attr('id', value.id);
                }
                $buttonGroup.append($button);
            });
            return $buttonGroup;
        }
    },
    table : {
        table : function(classes, id) {
            var $table = $(document.createElement('table'));
            $table.addClass("table");
            $(classes).each(function(index, value) {
                $table.addClass(value);
            });
            if (!(typeof id === 'undefined'))
                $table.attr("id", id);
            return $table;
        },
        thead : function(headers) {
            var $thead = $(document.createElement('thead'));
            var $tr = $(document.createElement('tr'));
            $(headers).each(function(index, value) {
                $th = $(document.createElement('th'));
                $th.append(value);
                $tr.append($th);
            });
            $thead.append($tr);
            return $thead;
        },
        tbody : function(body, headers) {
            var $tbody = $(document.createElement('tbody'));
            // if empty
            if (body.length == 0 && !(typeof headers === 'undefined')) {
                var $tr = $(document.createElement('tr'));
                var $td = $(document.createElement('td'));
                $td.attr('colspan', headers.length);
                $td.text('No data available');
                $td.addClass('empty');
                $tr.append($td);
                $tbody.append($tr);
                return $tbody;
            }
            // else, populate as usual
            $(body).each(function(index, value) {
                var $tr = $(document.createElement('tr'));
                $.each(value, function(key, value) {
                    if (key == 'type') {
                        // add classes
                        $(value).each(function(index, value) {
                            $tr.addClass(value);
                        });
                    } else if (key == 'entry') {
                        // add entries
                        $(value).each(function(index, value) {
                            var $td = $(document.createElement('td'));
                            $td.append(value);
                            $tr.append($td);
                        });
                    } else {
                        // data field
                        $tr.attr('data-' + key, value);
                    }
                    $tbody.append($tr);
                });
            });
            return $tbody;
        }
    },
}

//DO
