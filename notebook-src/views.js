function _1(md){
return (
md`# Introduction to views

    In Observable, a *view* is a user interface element that directly controls a *value* in the notebook. A view consists of two parts:

    * The *view*, which is typically an interactive DOM element (see [Introduction to HTML](https://observablehq.com/@observablehq/introduction-to-html) for more about DOM elements).
    * The *value*, which is any JavaScript value.

    For example, a view could be an [Observable range input](https://observablehq.com/@observablehq/input-range?collection=@observablehq/inputs) whose value is a number:`
);
}
function _x(Inputs){
return (
Inputs.range([0,1])
);
}
function _2(x){
return (
x
);
}
function _3(md){
return (
md`A view could be a text input whose value is a string:`
);
}
function _message(Inputs){
return (
Inputs.text({placeholder: "Say hello"})
);
}
function _4(message){
return (
message
);
}
function _dropdownMenu(md){
return (
md `A view could be a dropdown menu to choose from a set of options:`
);
}
function _color(Inputs){
return (
Inputs.select(["red", "orange", "yellow", "green", "blue", "violet"], {value: "green"})
);
}
function _5(color){
return (
color
);
}
function _6(md){
return (
md`So far we've made use of [Observable Inputs](https://observablehq.com/@observablehq/inputs?collection=@observablehq/inputs)—range sliders, dropdowns, and other lightweight interface components that help you explore data and build interactivity into your notebook. But views aren't limited to these input types. A view can have any visual representation you desire, and any value, too. You can use DOM elements to build more complex views.`
);
}
function _7(md){
return (
md`For example, a view could be a map that lets you specify any point on Earth:`
);
}
function _point(width,DOM,d3,graticule,land,sphere){
const height = width / 2;
      const context = DOM.context2d(width, height);
      const projection = d3.geoEqualEarth().fitSize([width, height], {type: "Sphere"});
      const path = d3.geoPath(projection, context);
      let mousedown = false;

      context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
      context.beginPath(), path(land), context.fill();
      context.beginPath(), path(sphere), context.strokeStyle = "#000", context.stroke();
      context.lineWidth = 2, context.strokeStyle = "#f00";
      const image = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

      function render(coordinates) {
        context.canvas.value = coordinates;
        context.clearRect(0, 0, width, height);
        context.putImageData(image, 0, 0);
        context.beginPath(), path({type: "Point", coordinates}), context.stroke();
      }

      context.canvas.onmousedown = event => {
        mousedown = true;
        context.canvas.onmousemove(event);
      };

      context.canvas.onmousemove = ({layerX, layerY}) => {
        if (!mousedown) return;
        render(projection.invert([layerX, layerY]));
        context.canvas.dispatchEvent(new CustomEvent("input"));
      };

      context.canvas.onmouseup = event => {
        mousedown = false;
      };

      render([0, 0]);
      return context.canvas;
}
function _8(point){
return (
point
);
}
function _9(md){
return (
md`A view could be a blank canvas for the user to draw a squiggle:`
);
}
function _stroke(DOM,width,d3){
const height = 280;
      const context = DOM.context2d(width, height);
      const curve = d3.curveBasis(context);
      const canvas = context.canvas;
      let stroke = [[102,211],[103,210],[108,200],[120,187],[142,154],[159,121],[173,90],[185,66],[192,52],[197,41],[199,35],[199,33],[199,32],[199,31],[199,31],[199,30],[199,31],[195,39],[187,53],[177,75],[166,103],[155,129],[147,144],[135,171],[132,178],[124,194],[120,203],[118,208],[116,213],[115,216],[114,218],[114,219],[113,220],[113,218],[114,214],[122,203],[134,185],[141,175],[148,168],[154,161],[159,157],[163,155],[167,153],[169,153],[171,153],[172,153],[173,155],[173,162],[173,171],[173,181],[173,193],[173,204],[173,210],[173,215],[174,218],[176,220],[178,221],[179,221],[183,222],[189,222],[197,216],[209,205],[222,188],[230,174],[235,164],[238,157],[239,152],[239,149],[238,148],[235,148],[230,148],[225,149],[221,153],[218,159],[216,165],[216,172],[216,180],[218,188],[224,196],[230,203],[236,206],[246,209],[253,209],[259,206],[265,199],[271,190],[280,174],[283,168],[287,159],[289,155],[290,151],[293,145],[296,139],[303,128],[310,113],[315,100],[320,86],[320,79],[321,70],[319,67],[312,66],[303,66],[291,74],[282,86],[273,102],[267,121],[262,141],[260,162],[260,176],[260,195],[263,210],[269,220],[275,225],[282,227],[288,226],[299,216],[311,192],[317,172],[328,139],[334,117],[341,92],[345,72],[347,65],[348,55],[349,50],[349,48],[347,47],[344,47],[340,51],[332,62],[327,72],[319,90],[314,109],[310,129],[308,152],[308,169],[308,188],[309,205],[314,218],[319,226],[326,231],[331,232],[337,232],[341,228],[345,223],[348,217],[351,211],[355,205],[357,201],[360,195],[361,192],[361,187],[362,182],[362,180],[362,178],[362,177],[362,176],[362,175],[361,175],[359,174],[358,174],[356,174],[355,174],[353,174],[352,175],[351,176],[349,180],[348,185],[347,190],[347,197],[347,203],[349,206],[353,208],[358,209],[362,209],[366,204],[368,197],[370,189],[370,181],[370,176],[370,171],[369,167],[368,164],[367,162],[366,162],[365,162],[365,162],[365,162],[366,162],[371,162],[379,162],[389,162],[399,161],[413,154],[421,146],[425,142]];

      context.beginPath();
      curve.lineStart();
      for (const p of stroke) curve.point(...p);
      curve.lineEnd();
      context.stroke();

      canvas.value = stroke;
      stroke = null;

      canvas.ontouchstart =
      canvas.onmousedown = event => {
        stroke = canvas.value = [];
        canvas.onmousemove(event);
      };

      canvas.ontouchend =
      canvas.onmouseup = () => {
        stroke = null;
      };

      canvas.ontouchmove =
      canvas.onmousemove = event => {
        if (stroke === null) return;
        event.preventDefault();
        stroke.push([event.layerX, event.layerY]);
        context.clearRect(0, 0, width, height);
        context.beginPath();
        curve.lineStart();
        for (const p of stroke) curve.point(...p);
        curve.lineEnd();
        context.stroke();
        canvas.dispatchEvent(new CustomEvent("input"));
      };

      return canvas;
}
function _10(stroke){
return (
stroke
);
}
function _11(md,color){
return (
md`If there is a value you’d like the user to control in your notebook, represent that value as a view. By doing so, you won’t need to manage event listeners and mutable state—you can simply refer to the value, and whenever the user changes it, your code will run automatically. For example, in the color dropdown menu you saw earlier, the selected color is <span style="display:inline-block;background-color:${color.toLowerCase()};width:1em;height:1em;"></span> ${color}; if you [go back](#dropdownMenu) and select a different color, the color patch in this cell updates.`
);
}
function _12(md){
return (
md`A view’s value is exposed as *element*.value. For example, here's a static view (one whose value never changes), for the purposes of illustration:`
);
}
function _silly(htl){
const element = htl.html`<div>I am a silly view!</div>`;
      element.value = "I am a silly value.";
      return element;
}
function _13(silly){
return (
silly
);
}
function _viewOf_defined(md){
return (
md`The \`viewof\` operator is just shorthand for defining the view and its value in the same cell. You can define them as separate cells if you prefer:`
);
}
function _explicitView(Inputs){
return (
Inputs.range([0,100])
);
}
function _explicitValue(Generators,explicitView){
return (
Generators.input(explicitView)
);
}
function _14(md){
return (
md`And, just as you can reference *explicitView* from another cell, you can reference the view defined by \`viewof\` from another cell, too. For example, you can refer to the value of the view *x* defined at the top of this notebook:`
);
}
function _15(md,viewof_x){
return (
md `The value of *x* is ${viewof_x.value}.`
);
}
function _16(md){
return (
md`To trigger the re-evaluation of any cell that references a view's value, the view must emit an *input* event. Here's another silly view that counts clicks (click on the emoji and then read the value of *count* below):`
);
}
function _count(html,Event){
const element = html`<div style="display: inline-block; font-size: 64px; user-select: none;">🤪</div>`;
      element.value = 0;
      element.onmousedown = () => {
        element.style.transition = "none";
        element.style.transform = `scale(1.5) rotate(${Math.random() * 90 - 45}deg)`;
      };
      element.onclick = () => {
        ++element.value;
        element.dispatchEvent(new Event("input", {bubbles: true}));
        requestAnimationFrame(() => {
          element.style.transition = "transform 250ms ease";
          element.style.transform = "inherit";
        });
      };
      return element;
}
function _17(count){
return (
count
);
}
function _18(md){
return (
md`As you might have guessed, the reason that HTML input elements work by default as views is that these elements have a value property and they emit *input* events when you interact with them. (There is a little extra logic for dealing with idiosyncrasies; see the [Generators.input](https://github.com/observablehq/stdlib/blob/master/src/generators/input.js) source for details. And actually, a view doesn’t need to be a DOM element; it only needs to support the [EventTarget interface](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). For an example of a non-element view, see the [Synchronized Inputs](https://observablehq.com/@observablehq/synchronized-inputs?collection=@observablehq/inputs) notebook.)

    Next time you find yourself reaching for an event listener or mutating global state, try a view instead. Now you’re thinking with dataflow.`
);
}
function _19(md){
return (
md`---

    ## Appendix`
);
}
function _sphere(){
return (
{type: "Sphere"}
);
}
function _graticule(d3){
return (
d3.geoGraticule10()
);
}
function _land(topojson,world){
return (
topojson.feature(world, world.objects.land)
);
}
function _world(FileAttachment){
return (
FileAttachment("land-50m.json").json()
);
}
function _topojson(require){
return (
require("topojson-client@3")
);
}

export default function define(runtime, observer) {
  const main = runtime.module();

  function toString() { return this.url; }
  const fileAttachments = new Map([
    
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof x")).define("viewof x", ["Inputs"], _x);
  main.define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer()).define(["x"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof message")).define("viewof message", ["Inputs"], _message);
  main.define("message", ["Generators", "viewof message"], (G, _) => G.input(_));
  main.variable(observer()).define(["message"], _4);
  main.variable(observer("dropdownMenu")).define("dropdownMenu", ["md"], _dropdownMenu);
  main.variable(observer("viewof color")).define("viewof color", ["Inputs"], _color);
  main.define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  main.variable(observer()).define(["color"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof point")).define("viewof point", ["width", "DOM", "d3", "graticule", "land", "sphere"], _point);
  main.define("point", ["Generators", "viewof point"], (G, _) => G.input(_));
  main.variable(observer()).define(["point"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof stroke")).define("viewof stroke", ["DOM", "width", "d3"], _stroke);
  main.define("stroke", ["Generators", "viewof stroke"], (G, _) => G.input(_));
  main.variable(observer()).define(["stroke"], _10);
  main.variable(observer()).define(["md", "color"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof silly")).define("viewof silly", ["htl"], _silly);
  main.define("silly", ["Generators", "viewof silly"], (G, _) => G.input(_));
  main.variable(observer()).define(["silly"], _13);
  main.variable(observer("viewOf_defined")).define("viewOf_defined", ["md"], _viewOf_defined);
  main.variable(observer("explicitView")).define("explicitView", ["Inputs"], _explicitView);
  main.variable(observer("explicitValue")).define("explicitValue", ["Generators", "explicitView"], _explicitValue);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md", "viewof x"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof count")).define("viewof count", ["html", "Event"], _count);
  main.define("count", ["Generators", "viewof count"], (G, _) => G.input(_));
  main.variable(observer()).define(["count"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("sphere")).define("sphere", _sphere);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("land")).define("land", ["topojson", "world"], _land);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);

  return main;
}