<!DOCTYPE html>
<html>
   <head>
      <link rel="stylesheet" type="text/css" href="CSS/styleSheet.css">
      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
      <!-- Optional theme -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
      <!-- Latest compiled and minified JavaScript -->
      <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
      
		<link rel=stylesheet href="codemirror/doc/docs.css">
		<link rel="stylesheet" href="codemirror/lib/codemirror.css">
		<link rel="stylesheet" href="codemirror/addon/hint/show-hint.css">
      <meta charset="utf-8">
      <title>Visualization of different ASATs</title>
   </head>
   <body>
      <nav id="main-title"  class="navbar navbar-dark bg-inverse">
         <!-- Navbar content -->
      </nav>
      <div id="wrapper">
       	  <div id="menu-left-wrapper">
            <div id="left-menu">
            <h3 onClick="handleClickSatType()">SATs</h3>
               
               <form name="button-options" action="">
                  <div id="checkStyleDiv"><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent sats" id="checkstyleButton" name="sat" value="CheckStyle"><label id="checkStyleLabel"> CheckStyle</label><br></div>
                  <div id="PMDDiv"><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent sats" id="pmdButton" name="sat" value="PMD"><label id="PMDLabel"> PMD</label><br></div>
                  <div id="FindBugsDiv"><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent sats" id="findBugsButton" name="sat" value="FindBugs"><label id="FindBugsLabel"> FindBugs</label><br></div>
                  <!--
                  <h3>Visualizers </h3>
                  <input type="radio" id="treemapButton" name="visualisation" onclick="handleClickVisualiser(this);"  value="treemap"> Treemap<br>
                  <input type="radio" id="graphButton" name="visualisation" onclick="handleClickVisualiser(this);" value="graph"> Graph<br>-->
                  <h3>Color scale </h3>
                  <input type="radio" id="absoluteButton" class="updateContent" name="colorScale" onclick="handleClickColorScale(this);"  value="absolute"> Absolute<br>
                  <input type="radio" id="relativeButton" class="updateContent" name="colorScale" onclick="handleClickColorScale(this);" value="relative"> Relative<br>
               </form>
            </div>
         </div>
         <div id="chart-wrapper">
          <div id="sub-title" class="sub-title">
            <button class="back-button" id="back-button" onclick="goBack()">Go back to package view</button>

         </div>
            <div id="chart">
            </div>
         </div>
         <div id="menu-right-wrapper">
            <div id="right-menu">
                  <h3>Category</h3>
                  <h4 class="category-titles" onClick="handleClickCategory('FunctionDefects')">Functional Defects</h4>
                  <label><input type="checkbox" data-toggle="toggle" data-size="mini"  class="updateContent FunctionalDefects" name="category" value="Check"> Check</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="Concurrency"> Concurrency</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="ErrorHandling"> Error Handling</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="Interface"> Interface</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="Logic"> Logic</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="Migration"> Migration</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent FunctionalDefects" name="category" value="Resource"> Resource</label><br>
                  <h4 class="category-titles" onClick="handleClickCategory('MaintainabilityDefects')">Maintainability Defects</h4>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Best Practices"> Best practices</label><br>
                <label><input type="checkbox"data-toggle="toggle" data-size="mini"  class="updateContent MaintainabilityDefects" name="category" value="Code Structure"> Code Structure</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Documentation Conventions"> Doc. Conventions</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Metric"> Metric</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Naming Conventions"> Naming Conventions</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Object Oriented Design"> OO Design</label><br>
                <label><input type="checkbox"data-toggle="toggle" data-size="mini"  class="updateContent MaintainabilityDefects" name="category" value="Refactorings - Simplifications"> Simplifications</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Refactorings - Redundancies"> Redundancies</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent MaintainabilityDefects" name="category" value="Style Conventions"> Style Conventions</label><br>
                  <h4 class="category-titles" onClick="handleClickCategory('StyleConventions')">Style Conventions</h4>
                  <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent StyleConventions" name="category" value="Other"> Other</label><br>
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent StyleConventions" name="category" value="Regular Expressions"> Regular Expressions</label><br>   
                <label><input type="checkbox" data-toggle="toggle" data-size="mini" class="updateContent StyleConventions" name="category" value="Tool Specific"> Tool Specific</label><br>
               </form>
            </div>
         </div>
      </div>

	<!--
		All Javascript files
        The order is important first included all libraries
        Then the visualization methods
        And finally the mainDriver which controlls erverything.
	-->
     <script src="jQuery/jquery-1.12.3.min.js"></script>
     
	<script src="codemirror/lib/codemirror.js"></script>
    <script src="codemirror/addon/hint/show-hint.js"></script>
    <script src="codemirror/addon/hint/javascript-hint.js"></script>
    <script src="codemirror/mode/javascript/javascript.js"></script>
    <script src="codemirror/mode/markdown/markdown.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
      <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
      <script src="D3/d3.min.js"></script>
    <script src="JSON/OOPPJSON.js"></script>
      <script src="JSON/jsonBuilder.js"></script>
      <script src="userPreferences/colorScale.js"></script>
      <script src="handleClicks.js"></script>
      <script src="treemap/treeMapBuilder.js"></script>
      <script src="graph/graphBuilder.js"></script>
      <script src="mainDriver.js"></script>
      
</body>

</html>