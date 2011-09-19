<!-- graph code begins here-->
<script type="text/javascript" src="wz_jsgraphics.js"></script>
<script type="text/javascript" src="pie.js">

<!-- Pie Graph script-By Balamurugan S http://www.sbmkpm.com/ //-->
<!-- Script featured/ available at Dynamic Drive code: http://www.dynamicdrive.com //-->

</script>

<div id="pieCanvas" style="overflow: auto; position:relative;height:350px;width:380px;"></div>

<script type="text/javascript">
var p = new pie();

p.add("4-5 people",1324);
p.add("6 people",111);
p.add("1 person",1197);
p.add("2-3 people",3611);


p.render("pieCanvas", "Pie Graph")

</script>
<!-- graph code ends here-->
