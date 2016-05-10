var acceptedTypes =[];
var acceptedRuleNames =["PackageName","JavadocMethod"];

// Run first time
runTreeMap();
	
/*
 * Handles click on checkboxes for showing results of different tools
 */
function handleClickTypeSat(cb) {
	if(document.getElementById('treemapButton').checked){
		if(cb.name == "sat"){
			var value = cb.value;
			var booleanChecked = cb.checked;  
			if(booleanChecked) {
				acceptedTypes.push(cb.value)
			} else{
				var index = acceptedTypes.indexOf(cb.value);
		  		console.log(index);
				if (index > -1) {
		    		acceptedTypes.splice(index, 1);
				}
			}
			runTreeMap();
		}
	} else if (document.getElementById('graphButton').checked) {
		if(cb.name == "sat"){
			var value = cb.value;
			var booleanChecked = cb.checked;  
			if(booleanChecked) {
				acceptedTypes.push(cb.value)
			} else{
				var index = acceptedTypes.indexOf(cb.value);
				if (index > -1) {
		    		acceptedTypes.splice(index, 1);
				}
			}
			removeChart();
			if(packagesLevel) {
				runGraph(graphJSON);
			} else {
				var packages = filterTypeRuleName(acceptedTypes, acceptedRuleNames);
				console.log()
				var inputData = createJsonGraphClasses(packages, sessionStorage.getItem('packageName'));
				runGraph(inputData);
			}
		}
	}
}

/*
 * Toggles between the graph and tree map visualization
 */
function handleClickVisualiser(radioButton){
	if(radioButton.value=="graph"){
		removeChart();
		packagesLevel = true;
		runGraph(graphJSON);
	} else if (radioButton.value=="treemap"){
		removeChart();
		runTreeMap();
	}
}

/*
 * Does the tree map setup and shows it
 */
function runTreeMap(){
	var element = document.getElementById("main-title");
    element.innerHTML = "Amount of warnings";

	var packages = filterTypeRuleName(acceptedTypes, acceptedRuleNames);
	var inputData = createJsonTreeMap(packages);	
	main({
    title: ""
	}, {
    fileName: "Test Project",
    values: inputData
	});	
}