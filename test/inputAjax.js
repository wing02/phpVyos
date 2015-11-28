
function aa() {
	$('#test').load('/test/demo_test.txt');
}

function getInputAjax() {
	$.post("/inputAjax.php", {
		name : "Donald Duck",
		city : "Duckburg"
	}, function(data, status) {
		document.getElementById('showInputAjax').innerHTML = $("result",$(data)).text();
	});
}
