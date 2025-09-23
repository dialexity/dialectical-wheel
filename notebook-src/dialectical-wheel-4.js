import define1 from "https://api.observablehq.com/@d3/color-legend.js?v=3"; 

function _1(md){
return (
md`# Dialectical Wheel with Arrows`
);
}
function _makeRings(arcTween,d3){
return (
({
      groups,
      labels,
      arcs,
      colorScales,
      styles,
      pie,
      radii,
      helpers,
      getDataToUse,
      getCellVisibility,
      bindCellEvents
    }) => {
      const { invisibleGroup, outerGroup, middleGroup, innerGroup } = groups;
      const { invisibleLabelsGroup, outerLabelsGroup, middleLabelsGroup, innerLabelsGroup } = labels;
      const { invisibleArc, outerArc, middleArc, innerArc } = arcs;
      const { invisibleColor, outerColor, middleColor, innerColor } = colorScales;

      function changeData(ringType, newData, arcGenerator) {
        const group = ringType === "outer" ? outerGroup : ringType === "middle" ? middleGroup : innerGroup;
        const labelsGroup = ringType === "outer" ? outerLabelsGroup : ringType === "middle" ? middleLabelsGroup : innerLabelsGroup;
        const pieData = pie(newData);
        const paths = group.selectAll("path").data(pieData, d => d.data.name);
        paths.transition()
          .duration(styles.durations.normal)
          .attrTween("d", arcTween(arcGenerator))
          .style("opacity", d => {
            if (!getCellVisibility(d.data.unitId, ringType)) return 0;
            const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
            return d.data.opacity * baseOpacity;
          });
        const labelsSel = labelsGroup.selectAll("text").data(pieData, d => d.data.name);
        labelsSel.transition()
          .duration(styles.durations.normal)
          .attr("transform", d => helpers.calculateTextTransform(d, arcGenerator))
          .style("opacity", d => (d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType)) ? 0 : d.data.opacity);
      }

      function updateLabels(labelsGroup, pieData, arcGenerator, ringType) {
        const labelsSel = labelsGroup.selectAll("text").data(pieData, d => d.data.name);
        const labelsEnter = labelsSel.enter()
          .append("text")
          .attr("class", "cell-label")
          .style("opacity", d => (d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType)) ? 0 : d.data.opacity)
          .attr("transform", d => helpers.calculateTextTransform(d, arcGenerator))
          .style("text-anchor", "middle")
          .style("dominant-baseline", "central")
          .style("font-family", styles.fonts.family)
          .style("font-size", d => {
            const b = styles.fonts.labels.baseSize;
            return `${ringType === "invisible" ? b.outer : ringType === "outer" ? b.outer : ringType === "middle" ? b.middle : b.inner}px`;
          })
          .style("font-weight", styles.fonts.labels.weight)
          .style("fill", d => {
            const t = styles.colors.text;
            if (ringType === "invisible") return 'black';
            if (ringType === "inner") return t.inner;
            if (ringType === "outer") return t.outer;
            return t.middle;
          })
          .style("pointer-events", "none")
          .each(function(d) {
            const textElement = d3.select(this);
            const b = styles.fonts.labels.baseSize;
            textElement.style("font-size", `${ringType === "invisible" ? b.outer : ringType === "outer" ? b.outer : ringType === "middle" ? b.middle : b.inner}px`);
            const text = d.data.fullText || d.data.name;
            const dataToUse = getDataToUse();
            let pieDataLocal, arcGen;
            if (ringType === "invisible") { pieDataLocal = pie(dataToUse.invisible); arcGen = d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible); }
            else if (ringType === "outer") { pieDataLocal = pie(dataToUse.outer); arcGen = d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius); }
            else if (ringType === "middle") { pieDataLocal = pie(dataToUse.middle); arcGen = d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius); }
            else { pieDataLocal = pie(dataToUse.inner); arcGen = d3.arc().innerRadius(30).outerRadius(radii.centerRadius); }
            const arcDatum = pieDataLocal.find(p => p.data.unitId === d.data.unitId);
            const constraints = helpers.getTextConstraints(ringType, arcDatum);
            helpers.wrapText(textElement, text, constraints);
          });
        labelsSel.merge(labelsEnter)
          .transition()
          .duration(styles.durations.normal)
          .attr("transform", d => helpers.calculateTextTransform(d, arcGenerator))
          .style("opacity", d => (d.data.value === 0 || !getCellVisibility(d.data.unitId, ringType)) ? 0 : d.data.opacity)
          .on("end", function(d) {
            if (d && d.data) {
              const textElement = d3.select(this);
              const b = styles.fonts.labels.baseSize;
              textElement.style("font-size", `${ringType === "invisible" ? b.outer : ringType === "outer" ? b.outer : ringType === "middle" ? b.middle : b.inner}px`);
              const text = d.data.fullText || d.data.name;
              const dataToUse = getDataToUse();
              let pieDataLocal, arcGen;
              if (ringType === "invisible") { pieDataLocal = pie(dataToUse.invisible); arcGen = d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible); }
              else if (ringType === "outer") { pieDataLocal = pie(dataToUse.outer); arcGen = d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius); }
              else if (ringType === "middle") { pieDataLocal = pie(dataToUse.middle); arcGen = d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius); }
              else { pieDataLocal = pie(dataToUse.inner); arcGen = d3.arc().innerRadius(30).outerRadius(radii.centerRadius); }
              const arcDatum = pieDataLocal.find(p => p.data.unitId === d.data.unitId);
              const constraints = helpers.getTextConstraints(ringType, arcDatum);
              helpers.wrapText(textElement, text, constraints);
            }
          });
        labelsSel.exit().transition().duration(styles.durations.normal).style("opacity", 0).remove();
      }

      function updateRing(group, labelsGroup, data, arcGenerator, ringType, colorScale) {
        const pieData = pie(data);
        const paths = group.selectAll("path").data(pieData, d => d.data.name);
        const pathsEnter = paths.enter()
          .append("path")
          .attr("class", "cell")
          .attr("fill", d => colorScale(d.data.unitId))
          .attr("stroke", ringType === "middle" ? styles.colors.strokes.middleRing : styles.colors.strokes.default)
          .attr("stroke-width", ringType === "middle" ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth)
          .attr("stroke-dasharray", "1,3")
          .attr("stroke-linecap", "round")
          .attr("stroke-opacity", 0.3)
          .style("opacity", d => {
            if (!getCellVisibility(d.data.unitId, ringType)) return 0;
            const baseOpacity = ringType === "outer" || ringType === "invisible" ? 1 : ringType === "middle" ? 0.9 : 0.8;
            return d.data.opacity * baseOpacity;
          })
          .attr("d", arcGenerator)
          .each(function(d) { this._current = d; });
        if (bindCellEvents) {
          bindCellEvents(pathsEnter, ringType);
        }
        paths.merge(pathsEnter)
          .transition()
          .duration(styles.durations.normal)
          .attrTween("d", arcTween(arcGenerator))
          .style("opacity", d => {
            if (!getCellVisibility(d.data.unitId, ringType)) return 0;
            if (ringType === "invisible") return 0;
            const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
            return d.data.opacity * baseOpacity;
          });
        paths.exit().transition().duration(styles.durations.normal).style("opacity", 0).remove();
        updateLabels(labelsGroup, pieData, arcGenerator, ringType);
      }

      function updateAllRings() {
        const dataToUse = getDataToUse();
        updateRing(invisibleGroup, invisibleLabelsGroup, dataToUse.invisible, invisibleArc, "invisible", invisibleColor);
        updateRing(outerGroup, outerLabelsGroup, dataToUse.outer, outerArc, "outer", outerColor);
        updateRing(middleGroup, middleLabelsGroup, dataToUse.middle, middleArc, "middle", middleColor);
        updateRing(innerGroup, innerLabelsGroup, dataToUse.inner, innerArc, "inner", innerColor);
      }

      return { updateAllRings, updateRing, changeData };
    }
);
}
function _dialecticalData(transformWisdomUnitsToDialecticalData,wisdomUnits,componentOrder){
return (
transformWisdomUnitsToDialecticalData(wisdomUnits,componentOrder)
);
}
function _width(){
return (
500
);
}
function _styles(userHubColor,ringColors,textColors){
return (
{
        // Dimensions
        width: 500,
        height: 500,
        radii: {
          invisible: 250,
          outer: 200,
          middleOuter: 150,
          middleInner: 100,
          inner: 100,
          hub: 30,
          drag: 280,
        },
        // Colors
        colors: {
          hub: userHubColor, // Khaki
          rings: ringColors,
          text: textColors,
          strokes: { default: "#000", middleRing: "#000", zoom: null },
          axis: {
            positive: { fill: "#C6E5B3", stroke: "#2d5a2d" },
            neutral:  { fill: "white",   stroke: "#333" },
            negative: { fill: "#F9C6CC", stroke: "#8b1538" }
          }
        },
        // Fonts
        fonts: {
          labels: {
            baseSize: { outer: 10, middle: 10, inner: 10 },
            weight: "600",
            zoomBaseSize: 8,
            zoomMinSize: 6,
            zoomMaxSize: 16
          },
          coordinates: { size: 12, weight: "bold" }
        },
        // Strokes
        strokes: {
          defaultWidth: 1,
          middleRingWidth: 1,
          zoomWidth: 0,
          axisCircleWidth: 1.5
        },
        // Animation
        durations: {
          normal: 750,
          stepRotation: 600
        }
      }
);
}
function _arrowControls(html,parseArrowConnections,arrowConnections,dialecticalData,viewof_chart,isThesisType,arrowUtilities,d3){
return (
(() => {
      const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
        <div style="margin-bottom: 10px; font-weight: bold;">Arrow Connections</div>

        <!-- Basic Arrow Controls -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center;">
          <button id="toggle-arrows" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show Arrows</button>
          <button id="redraw-arrows" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Redraw Arrows</button>
        </div>

        <!-- Step-by-Step Arrow Drawing -->
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9;">
          <div style="font-weight: bold; margin-bottom: 10px;">Step-by-Step Arrow Drawing</div>
          <div style="display: flex; gap: 10px; margin-bottom: 10px; align-items: center;">
            <button id="start-arrow-steps" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #e7f3ff; cursor: pointer;">Start Step Mode</button>
            <button id="prev-arrow" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Previous</button>
            <span id="arrow-counter" style="margin: 0 10px; font-weight: bold; min-width: 120px;">Ready to start</span>
            <button id="next-arrow" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Next Arrow</button>
            <button id="show-all-arrows" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show All</button>
          </div>
          <div id="current-arrow-info" style="font-size: 12px; color: #666; min-height: 20px; font-style: italic;"></div>
        </div>
      </div>`;

      const toggleBtn = container.querySelector('#toggle-arrows');
      const redrawBtn = container.querySelector('#redraw-arrows');

      // Step-by-step controls
      const startStepsBtn = container.querySelector('#start-arrow-steps');
      const prevArrowBtn = container.querySelector('#prev-arrow');
      const nextArrowBtn = container.querySelector('#next-arrow');
      const showAllBtn = container.querySelector('#show-all-arrows');
      const arrowCounter = container.querySelector('#arrow-counter');
      const arrowInfo = container.querySelector('#current-arrow-info');

      let arrowsVisible = false;
      let arrowStepMode = false;
      let currentArrowStep = 0;
      let parsedArrowConnections = [];

      // Parse current connections for step mode
      function updateArrowConnections() {
        parsedArrowConnections = parseArrowConnections(arrowConnections, dialecticalData);
      }

      function updateArrowStepUI() {
        if (!arrowStepMode) {
          arrowCounter.textContent = "Ready to start";
          arrowInfo.textContent = "";
          startStepsBtn.disabled = false;
          prevArrowBtn.disabled = true;
          nextArrowBtn.disabled = true;
          showAllBtn.disabled = false;
          return;
        }

        const totalArrows = parsedArrowConnections.length;
        arrowCounter.textContent = `Arrow ${currentArrowStep} of ${totalArrows}`;

        if (currentArrowStep === 0) {
          arrowInfo.textContent = "All arrows cleared. Click Next to draw first arrow.";
        } else if (currentArrowStep <= totalArrows) {
          const conn = parsedArrowConnections[currentArrowStep - 1];
          arrowInfo.textContent = `Current: ${conn.from}${conn.fromRing !== 'middle' ? (conn.fromRing === 'inner' ? '+' : '-') : ''} → ${conn.to}${conn.toRing !== 'middle' ? (conn.toRing === 'inner' ? '+' : '-') : ''}`;
        }

        startStepsBtn.disabled = true;
        prevArrowBtn.disabled = currentArrowStep <= 0;
        nextArrowBtn.disabled = currentArrowStep >= totalArrows;
        showAllBtn.disabled = false;
      }

      function drawArrowsUpToStep(step) {
        viewof_chart.clearArrows();
        if (step <= 0) return;

        for (let i = 0; i < Math.min(step, parsedArrowConnections.length); i++) {
          const conn = parsedArrowConnections[i];

          // Calculate color (same logic as drawAllArrows)
          let color = "#666";
          if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
            if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
                (conn.fromRing === 'outer' && conn.toRing === 'outer') ||
                (conn.fromRing === 'invisible' && conn.toRing === 'invisible')) {
              color = "#16a34a"; // Green for same polarity
            } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                       (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
              color = "#dc2626"; // Red for opposite polarity
            } else if (conn.fromRing === 'invisible' || conn.toRing === 'invisible') {
              color = "#ff9500"; // Orange for invisible ring connections
            } else {
              color = "#8b5cf6"; // Purple for mixed connections
            }
          } else {
            const fromIsThesis = isThesisType(conn.from);
            const toIsThesis = isThesisType(conn.to);
            if (fromIsThesis === toIsThesis) {
              color = "#2563eb"; // Blue for same type
            } else {
              color = "#dc2626"; // Red for opposition
            }
          }

          // Draw previous arrows instantly (no animation), only animate the last one
          const delay = (i === step - 1) ? 0 : 0;
          drawStaticArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing);
        }
      }

      function drawNextArrow() {
        if (currentArrowStep >= parsedArrowConnections.length) return;

        const conn = parsedArrowConnections[currentArrowStep];

        // Calculate color
        let color = "#666";
        if (conn.fromRing !== 'middle' || conn.toRing !== 'middle') {
          if ((conn.fromRing === 'inner' && conn.toRing === 'inner') || 
              (conn.fromRing === 'outer' && conn.toRing === 'outer')) {
            color = "#16a34a"; // Green for same polarity
          } else if ((conn.fromRing === 'inner' && conn.toRing === 'outer') || 
                     (conn.fromRing === 'outer' && conn.toRing === 'inner')) {
            color = "#dc2626"; // Red for opposite polarity
          } else {
            color = "#8b5cf6"; // Purple for mixed connections
          }
        } else {
              const fromIsThesis = isThesisType(conn.from);
        const toIsThesis = isThesisType(conn.to);
          if (fromIsThesis === toIsThesis) {
            color = "#2563eb"; // Blue for same type
          } else {
            color = "#dc2626"; // Red for opposition
          }
        }

        // Draw this arrow with animation
        viewof_chart.drawArrow(conn.from, conn.to, color, 2, conn.fromRing, conn.toRing, 0);
      }

      function drawStaticArrow(from, to, color = "#666", strokeWidth = 2, fromRing = 'middle', toRing = 'middle') {
        const fromPos = viewof_chart.getCellCentroid(from, fromRing);
        const toPos = viewof_chart.getCellCentroid(to, toRing);

        if (!fromPos || !toPos) return;

        // Get the appropriate arrowhead marker ID for this color
        function getArrowheadId(color) {
          switch(color) {
            case "#16a34a": return "arrowhead-green";
            case "#dc2626": return "arrowhead-red";
            case "#8b5cf6": return "arrowhead-purple";
            case "#2563eb": return "arrowhead-blue";
            case "#ff9500": return "arrowhead-orange";
            default: return "arrowhead-gray";
          }
        }

        const arrowheadId = getArrowheadId(color);

        // Use shared path calculator for consistency
        const arrowPath = arrowUtilities.calculateArrowPath(fromPos, toPos, 10);
        const path = arrowPath.path;

        // Get the arrows group from the chart
        const svg = d3.select(viewof_chart);
        const arrowsGroup = svg.select('.arrows-group');

        // Draw static arrow (no animation)
        arrowsGroup.append("path")
          .attr("d", path)
          .attr("stroke", color)
          .attr("stroke-width", strokeWidth)
          .attr("fill", "none")
          .attr("marker-end", `url(#${arrowheadId})`)
          .attr("opacity", 0.7);
      }

      // Basic arrow controls
      toggleBtn.addEventListener('click', () => {
        if (arrowsVisible) {
          viewof_chart.clearArrows();
          toggleBtn.textContent = 'Show Arrows';
          arrowsVisible = false;
        } else {
          if (arrowStepMode) {
            drawArrowsUpToStep(currentArrowStep);
          } else {
            viewof_chart.drawAllArrows();
          }
          toggleBtn.textContent = 'Hide Arrows';
          arrowsVisible = true;
        }
      });

      redrawBtn.addEventListener('click', () => {
        if (arrowsVisible) {
          if (arrowStepMode) {
            drawArrowsUpToStep(currentArrowStep);
          } else {
            viewof_chart.drawAllArrows();
          }
        }
      });

      // Step-by-step arrow controls
      startStepsBtn.addEventListener('click', () => {
        updateArrowConnections();
        arrowStepMode = true;
        currentArrowStep = 0;
        if (arrowsVisible) {
          viewof_chart.clearArrows();
        }
        updateArrowStepUI();
      });

      prevArrowBtn.addEventListener('click', () => {
        if (currentArrowStep > 0) {
          currentArrowStep--;
          if (arrowsVisible) {
            drawArrowsUpToStep(currentArrowStep);
          }
          updateArrowStepUI();
        }
      });

      nextArrowBtn.addEventListener('click', () => {
        if (currentArrowStep < parsedArrowConnections.length) {
          if (arrowsVisible) {
            // Draw only the next arrow with animation
            drawNextArrow();
          }
          currentArrowStep++;
          updateArrowStepUI();
        }
      });

      showAllBtn.addEventListener('click', () => {
        arrowStepMode = false;
        currentArrowStep = 0;
        if (arrowsVisible) {
          viewof_chart.drawAllArrows();
        }
        updateArrowStepUI();
      });

      // Initialize
      updateArrowConnections();
      updateArrowStepUI();

      // Return the container
      container.value = "arrow-controls";
      return container;
    })()
);
}
function _2(unFocus,viewof_chart){
if(unFocus){
        viewof_chart.unfocus();
      }
}
function _unFocus(Inputs){
return (
Inputs.toggle({label:"Unfocus"})
);
}
function _showFlow(Inputs){
return (
Inputs.toggle({label:"Show sequential flow"})
);
}
function _showFlowSubscription(Generators,viewof_showFlow,viewof_chart,d3,invalidation){
return (
Generators.observe(notify => {
      const node = viewof_showFlow;
      const handler = () => {
        if (node.value) viewof_chart.drawFlow(); else d3.select(viewof_chart).selectAll('g.flow-arrows').remove();;
        notify(node.value);
      };
      node.addEventListener("input", handler);
      invalidation.then(() => node.removeEventListener("input", handler));
      handler();
    })
);
}
function _isWhiteOutside(Inputs){
return (
Inputs.toggle({label: "Swap red and white layer"})
);
}
function _userRingColors(){
return (
{
      outer: "#F9C6CC",    // Outer ring background color
      middle: "#ffffff",   // Middle ring background color  
      inner: "#C6E5B3"     // Inner ring background color
    }
);
}
function _userTextColors(){
return (
{ 
      outer: "#8b1538",  // Outer ring text color
      middle: "#333",   // Middle ring text color
      inner: "#2d5a2d",   // Inner ring text color
      coordinates: "#333"  // Coordinate text color
    }
);
}
function _userHubColor(){
return (
"#ffff7a"
);
}
function _ringColors(isWhiteOutside,userRingColors){
return (
isWhiteOutside
      ? { outer: userRingColors.middle, middle: userRingColors.outer, inner: userRingColors.inner }
      : { outer: userRingColors.outer, middle: userRingColors.middle, inner: userRingColors.inner }
);
}
function _textColors(isWhiteOutside,userTextColors){
return (
isWhiteOutside
      ? { outer: userTextColors.middle, middle: userTextColors.outer, inner: userTextColors.inner, coordinates: userTextColors.coordinates }
      : { outer: userTextColors.outer, middle: userTextColors.middle, inner: userTextColors.inner, coordinates: userTextColors.coordinates }
);
}
function _whitesOnly(Inputs){
return (
Inputs.toggle({label: "White cells only"})
);
}
function _TsOnly(Inputs){
return (
Inputs.toggle({label: "Ts only"})
);
}
function _3(DOM,serialize,viewof_chart){
return (
DOM.download(() => serialize(viewof_chart), undefined, "Save as SVG")
);
}
function _makeArrowsModule(d3,location){
return (
({ defs, contentGroup, centerCircle, nestedData, pie, radii, styles, arrowUtilities }) => {
      const arrowsGroup = contentGroup.append("g")
        .attr("class", "arrows-group")
        .style("pointer-events", "none");
      // Ensure yellow circle is beneath arrows
      centerCircle.lower();
      // Ensure arrows are above rings (labels/coordinate can raise after)
      arrowsGroup.raise();
      // Prepare arrowheads
      arrowUtilities.createArrowheadMarker(defs, "#666", "arrowhead-gray");
      arrowUtilities.createArrowheadMarker(defs, "#16a34a", "arrowhead-green");
      arrowUtilities.createArrowheadMarker(defs, "#dc2626", "arrowhead-red");
      arrowUtilities.createArrowheadMarker(defs, "#8b5cf6", "arrowhead-purple");
      arrowUtilities.createArrowheadMarker(defs, "#2563eb", "arrowhead-blue");
      arrowUtilities.createArrowheadMarker(defs, "#ff9500", "arrowhead-orange");
      // Label groups for anchoring arrows to text labels
      const labelGroups = {
        invisible: contentGroup.select('.invisible-labels'),
        outer: contentGroup.select('.outer-labels'),
        middle: contentGroup.select('.middle-labels'),
        inner: contentGroup.select('.inner-labels')
      };
      // We will construct paths using our quadratic curve utility, not d3.link*

      // Compute intersection of ray from label center to target with the rotated
      // label bounding rectangle; return an anchor slightly outside the edge.
      function getRectEdgeAnchor(labelInfo, towardPos, padding = 2, backOff = 0) {
        const cx = labelInfo.x;
        const cy = labelInfo.y;
        const w2 = (labelInfo.labelWidth / 2) + padding;
        const h2 = (labelInfo.labelHeight / 2) + padding;
        const theta = labelInfo.labelRotationRadians || 0;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Vector from center to target in global
        const dx = towardPos.x - cx;
        const dy = towardPos.y - cy;

        // Rotate to label-local coordinates (apply -theta)
        const lx =  cosT * dx + sinT * dy;
        const ly = -sinT * dx + cosT * dy;

        // Intersect with local rectangle edges
        let ix = 0, iy = 0;
        const sign = v => (v >= 0 ? 1 : -1);
        const candidates = [];

        if (lx !== 0) {
          const tx = (sign(lx) * w2) / lx;
          if (tx > 0) {
            const yAt = ly * tx;
            if (Math.abs(yAt) <= h2) candidates.push({ t: tx, x: sign(lx) * w2, y: yAt });
          }
        }
        if (ly !== 0) {
          const ty = (sign(ly) * h2) / ly;
          if (ty > 0) {
            const xAt = lx * ty;
            if (Math.abs(xAt) <= w2) candidates.push({ t: ty, x: xAt, y: sign(ly) * h2 });
          }
        }

        if (candidates.length === 0) {
          // Fallback: center point
          ix = 0; iy = 0;
        } else {
          const best = candidates.reduce((a, b) => (a.t < b.t ? a : b));
          ix = best.x; iy = best.y;
        }

        // Rotate back to global and translate to center
        const gx = cx + (cosT * ix - sinT * iy);
        const gy = cy + (sinT * ix + cosT * iy);

        if (backOff > 0) {
          // Move slightly further out along the ray direction
          const vx = gx - cx;
          const vy = gy - cy;
          const vlen = Math.hypot(vx, vy) || 1;
          return { x: gx + (vx / vlen) * backOff, y: gy + (vy / vlen) * backOff };
        }
        return { x: gx, y: gy };
      }
      function getCellCentroid(unitId, ringType = "middle") {
        const dataToUse = nestedData;
        let pieData, arcGenerator;
        const { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius } = radii;
        switch (ringType) {
          case "invisible":
            pieData = pie(dataToUse.invisible);
            arcGenerator = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
            break;
          case "outer":
            pieData = pie(dataToUse.outer);
            arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
            break;
          case "middle":
            pieData = pie(dataToUse.middle);
            arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
            break;
          case "inner":
            pieData = pie(dataToUse.inner);
            arcGenerator = d3.arc().innerRadius(30).outerRadius(centerRadius);
            break;
          default:
            pieData = pie(dataToUse.middle);
            arcGenerator = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
        }
        const cellData = pieData.find(d => d.data.unitId === unitId);
        if (!cellData) return null;
        const centroid = arcGenerator.centroid(cellData);
        // Derive the exact radii used for this ring so we can compute an effective boundary offset
        let ringInner, ringOuter;
        if (ringType === "invisible") {
          ringInner = outerRadius;
          ringOuter = styles.radii.invisible;
        } else if (ringType === "outer") {
          ringInner = innerRadius;
          ringOuter = outerRadius;
        } else if (ringType === "middle") {
          ringInner = innerInnerRadius;
          ringOuter = middleRadius;
        } else if (ringType === "inner") {
          ringInner = 30; // hub radius used in the arc generator above
          ringOuter = centerRadius;
        } else {
          ringInner = innerInnerRadius;
          ringOuter = middleRadius;
        }
        const angleSpan = cellData.endAngle - cellData.startAngle;
        const rCentroid = (ringInner + ringOuter) / 2;
        const thickness = ringOuter - ringInner;
        return {
          x: centroid[0],
          y: centroid[1],
          angle: (cellData.startAngle + cellData.endAngle) / 2,
          ringType,
          rInner: ringInner,
          rOuter: ringOuter,
          rCentroid,
          thickness,
          angleSpan
        };
      }
      // Compute label info (center in contentGroup coords and bounding radius from text bbox)
      function getLabelInfo(unitId, ringType) {
        const group = labelGroups[ringType];
        if (!group || group.empty()) return null;
        const sel = group.selectAll('text.cell-label').filter(d => d && d.data && d.data.unitId === unitId);
        if (sel.empty()) return null;
        const node = sel.node();
        const bbox = node.getBBox();
        // The transform is set as translate(x,y) rotate(...)
        const transformAttr = node.getAttribute('transform') || '';
        let cx = 0, cy = 0, rotationDeg = 0;
        const match = transformAttr.match(/translate\(([^,\)]+)[, ]+([^\)]+)\)/);
        if (match) {
          cx = parseFloat(match[1]);
          cy = parseFloat(match[2]);
        }
        const rotMatch = transformAttr.match(/rotate\(([-+]?[0-9]*\.?[0-9]+)\)/);
        if (rotMatch) {
          rotationDeg = parseFloat(rotMatch[1]);
        }
        const radius = Math.sqrt(Math.pow(bbox.width / 2, 2) + Math.pow(bbox.height / 2, 2));
        return {
          x: cx,
          y: cy,
          labelWidth: bbox.width,
          labelHeight: bbox.height,
          labelRotationRadians: (rotationDeg * Math.PI) / 180,
          radius
        };
      }

      function drawArrow(from, to, color = "#666", strokeWidth = 2, fromRing = "middle", toRing = "middle", delay = 0) {
        // Use centroids only for endpoints
        const fromPos = getCellCentroid(from, fromRing);
        const toPos = getCellCentroid(to, toRing);
        if (!fromPos || !toPos) return;

        // Shorten by scaling toward midpoint
        const shrink = 1;
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const source = { x: midX + (fromPos.x - midX) * shrink, y: midY + (fromPos.y - midY) * shrink };
        const target = { x: midX + (toPos.x - midX) * shrink, y: midY + (toPos.y - midY) * shrink };

        const arrowPath = arrowUtilities.calculateArrowPath(source, target, 0);

        const arrowheadId = arrowUtilities.getArrowheadId(color);
        const staticPath = arrowsGroup.append("path")
          .attr("d", arrowPath.path)
          .attr("stroke", color)
          .attr("stroke-width", strokeWidth)
          .attr("fill", "none")
          .attr("opacity", 0.3)
          .attr("stroke-dasharray", "3,3");

        const animatedHead = arrowsGroup.append("polygon")
          .attr("points", "0,-1.5 4.5,0 0,1.5")
          .attr("fill", color)
          .attr("opacity", 0);

        animatedHead
          .transition()
          .delay(delay)
          .duration(1200)
          .ease(d3.easeQuadInOut)
          .attrTween("transform", function() {
            return function(t) {
              const p = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, t);
              const nextT = Math.min(t + 0.01, 1);
              const n = arrowUtilities.getPointAlongQuadraticCurve(arrowPath.start, arrowPath.control, arrowPath.end, nextT);
              const ang = Math.atan2(n.y - p.y, n.x - p.x) * 180 / Math.PI;
              return `translate(${p.x}, ${p.y}) rotate(${ang})`;
            };
          })
          .attr("opacity", 1)
          .on("start", function() {
            staticPath.transition().duration(200).attr("opacity", 0.7);
          })
          .on("end", function() {
            animatedHead.remove();
            staticPath
              .attr("marker-end", () => `url(${new URL(`#${arrowheadId}`, location)})`)
              .attr("stroke-dasharray", "none")
              .transition()
              .duration(300)
              .attr("opacity", 0.9);
          });
      }
      function clearArrows() {
        arrowsGroup.selectAll("*").remove();
      }
      // Treat <text> labels as nodes and draw force-graph-style links between them
      // options.klass: optional CSS class to tag this batch (e.g., 'flow-arrows')
      function drawLabelLinks(connections, options = {}) {
        const klass = options.klass || "";
        //arrowsGroup.selectAll("*").remove();

        // Build node map keyed by unitId:ringType
        const nodeByKey = new Map();
        function ensureNode(unitId, ringType) {
          const key = `${unitId}:${ringType}`;
          if (nodeByKey.has(key)) return nodeByKey.get(key);
          const label = getLabelInfo(unitId, ringType);
          const pos = label || getCellCentroid(unitId, ringType);
          if (!pos) return null;
          const padding = 2;
          const hasEllipse = !!label;
          const ellipseRx = hasEllipse ? Math.max(1, label.labelWidth  / 2) : null;
          const ellipseRy = hasEllipse ? Math.max(1, label.labelHeight / 2) : null;
          const ellipseTheta = hasEllipse ? (label.labelRotationRadians || 0) : 0;
          const radius = hasEllipse
            ? Math.min(ellipseRx, ellipseRy) + padding
            : Math.max(6, (pos.thickness || 12) * 0.3);
          const node = {
            id: key,
            unitId,
            ringType,
            x: pos.x,
            y: pos.y,
            fx: pos.x,
            fy: pos.y,
            radius,
            hasEllipse,
            ellipseRx,
            ellipseRy,
            ellipseTheta
          };
          nodeByKey.set(key, node);
          return node;
        }

        // Build links with per-connection color
        const links = [];
        connections.forEach(conn => {
          const fromRing = conn.fromRing || 'middle';
          const toRing = conn.toRing || 'middle';
          const s = ensureNode(conn.from, fromRing);
          const t = ensureNode(conn.to, toRing);
          if (!s || !t) return;
          const color = arrowUtilities.calculateArrowColor(fromRing, toRing, conn.from, conn.to);
          links.push({ source: s, target: t, color });
        });

        // Helper: anchor on ellipse boundary given a world-space direction
        function anchorOnEllipse(cx, cy, rx, ry, theta, towardX, towardY, offset) {
          const dx = towardX - cx, dy = towardY - cy;
          const len = Math.hypot(dx, dy) || 1;
          let ux = dx / len, uy = dy / len;
          const c = Math.cos(theta), s = Math.sin(theta);
          // rotate into ellipse local frame (-theta)
          const uxLocal =  ux * c + uy * s;
          const uyLocal = -ux * s + uy * c;
          const denom = Math.sqrt((uxLocal*uxLocal)/(rx*rx) + (uyLocal*uyLocal)/(ry*ry)) || 1;
          const scale = 1 / denom;
          const exLocal = uxLocal * (scale + offset);
          const eyLocal = uyLocal * (scale + offset);
          // rotate back to world
          const ex = cx + (exLocal * c - eyLocal * s);
          const ey = cy + (exLocal * s + eyLocal * c);
          return { x: ex, y: ey };
        }

        // Arc path similar to force-graph cell, but compute anchors on ellipse (or circle fallback)
        function linkArc(d) {
          const buffer = 2;
          const arrowheadLen = 5;
          // Source anchor toward target
          let start;
          if (d.source.hasEllipse) {
            start = anchorOnEllipse(d.source.x, d.source.y, d.source.ellipseRx, d.source.ellipseRy, d.source.ellipseTheta, d.target.x, d.target.y, buffer);
          } else {
            const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y;
            const dist = Math.hypot(dx, dy) || 1;
            start = { x: d.source.x + (dx/dist) * (d.source.radius + buffer), y: d.source.y + (dy/dist) * (d.source.radius + buffer) };
          }
          // Target anchor from target back toward source (subtract arrowhead length)
          let end;
          if (d.target.hasEllipse) {
            // move slightly inside by arrowheadLen along reverse direction
            const anchor = anchorOnEllipse(d.target.x, d.target.y, d.target.ellipseRx, d.target.ellipseRy, d.target.ellipseTheta, d.source.x, d.source.y, arrowheadLen);
            end = anchor;
          } else {
            const dx = d.source.x - d.target.x, dy = d.source.y - d.target.y;
            const dist = Math.hypot(dx, dy) || 1;
            end = { x: d.target.x + (dx/dist) * (d.target.radius + arrowheadLen), y: d.target.y + (dy/dist) * (d.target.radius + arrowheadLen) };
          }
          const dxA = end.x - start.x, dyA = end.y - start.y;
          const distance = Math.hypot(dxA, dyA) || 1;
          // If very close, choose a better emission point and take a longer route
          if (distance < 30) {
            // Re-anchor source on the outward side of the ellipse to avoid cramped starts
            if (d.source.hasEllipse) {
              const rlen = Math.hypot(d.source.x, d.source.y) || 1;
              const outx = d.source.x / rlen, outy = d.source.y / rlen;
              const towardX = d.source.x + outx * (d.source.ellipseRx + d.source.ellipseRy);
              const towardY = d.source.y + outy * (d.source.ellipseRx + d.source.ellipseRy);
              start = anchorOnEllipse(d.source.x, d.source.y, d.source.ellipseRx, d.source.ellipseRy, d.source.ellipseTheta, towardX, towardY, buffer);
            }
            // Re-anchor target outward as the entry point, then back off by arrowheadLen along the link direction
            if (d.target.hasEllipse) {
              const rlenT = Math.hypot(d.target.x, d.target.y) || 1;
              const outxT = d.target.x / rlenT, outyT = d.target.y / rlenT;
              const towardXT = d.target.x + outxT * (d.target.ellipseRx + d.target.ellipseRy);
              const towardYT = d.target.y + outyT * (d.target.ellipseRx + d.target.ellipseRy);
              const outPt = anchorOnEllipse(d.target.x, d.target.y, d.target.ellipseRx, d.target.ellipseRy, d.target.ellipseTheta, towardXT, towardYT, 0);
              const vdx = outPt.x - start.x, vdy = outPt.y - start.y;
              const vlen = Math.hypot(vdx, vdy) || 1;
              end = { x: outPt.x - (vdx / vlen) * arrowheadLen, y: outPt.y - (vdy / vlen) * arrowheadLen };
            }
            // Quadratic curve with boosted curvature, bending outward from the wheel center
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            let perpX = -dyA / (distance || 1);
            let perpY =  dxA / (distance || 1);
            // Ensure bend is outward (same direction as radial from center at midpoint)
            const dotOut = perpX * midX + perpY * midY;
            if (dotOut < 0) { perpX = -perpX; perpY = -perpY; }
            const curve = Math.max(40, distance * 0.6);
            const cx = midX + perpX * curve;
            const cy = midY + perpY * curve;
            return `M${start.x},${start.y} Q ${cx},${cy} ${end.x},${end.y}`;
          }
          const dr = distance * 1;
          return `M${start.x},${start.y}A${dr},${dr} 0 0,1 ${end.x},${end.y}`;
        }

        const linkGroup = arrowsGroup.append("g").attr("class", `label-link-group${klass ? ` ${klass}` : ""}`);

        // Draw links sequentially with a shooting animation
        function drawNextLink(index) {
          if (index >= links.length) return;
          const d = links[index];
          const pathData = linkArc(d);

          const path = linkGroup.append("path")
            .attr("fill", "none")
            .attr("stroke", d.color)
            .attr("stroke-width", 1.25)
            .attr("opacity", 0.3)
            .attr("stroke-dasharray", "3,3")
            .attr("d", pathData);

          const head = linkGroup.append("polygon")
            .attr("points", "0,-1.5 4.5,0 0,1.5")
            .attr("fill", d.color)
            .attr("opacity", 0);

          head.transition()
            .duration(900)
            .ease(d3.easeQuadInOut)
            .attrTween("transform", function() {
              const node = path.node();
              const L = node.getTotalLength();
              return function(t) {
                const p = node.getPointAtLength(t * L);
                const p2 = node.getPointAtLength(Math.min(L, t * L + 1));
                const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
                return `translate(${p.x}, ${p.y}) rotate(${ang})`;
              };
            })
            .attr("opacity", 1)
            .on("start", function() {
              path.transition().duration(200).attr("opacity", 0.7);
            })
            .on("end", function() {
              head.remove();
              path
                .attr("marker-end", () => `url(${new URL(`#${arrowUtilities.getArrowheadId(d.color)}`, location)})`)
                .attr("stroke-dasharray", "none")
                .transition()
                .duration(250)
                .attr("opacity", 0.85);
              drawNextLink(index + 1);
            });
        }

        drawNextLink(0);
      }

      return { arrowsGroup, getCellCentroid, drawArrow, drawLabelLinks, clearArrows };
    }
);
}
function _radii(styles){
return (
{
      outerRadius: styles.radii.outer,
      innerRadius: styles.radii.middleOuter,
      middleRadius: styles.radii.middleOuter,
      innerInnerRadius: styles.radii.middleInner,
      centerRadius: styles.radii.inner
    }
);
}
function _pie(d3){
return (
d3.pie().value(d => d.value).sort(null)
);
}
function _arcs(d3,radii,styles){
return (
{
      invisibleArc: d3.arc().innerRadius(radii.outerRadius).outerRadius(styles.radii.invisible),
      outerArc: d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius),
      middleArc: d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius),
      innerArc: d3.arc().innerRadius(styles.radii.hub).outerRadius(radii.centerRadius)
    }
);
}
function _colorScales(d3,dialecticalData,styles){
return (
{
      invisibleColor: d3.scaleOrdinal()
        .domain(Object.keys(dialecticalData))
        .range(Object.keys(dialecticalData).map(() => "transparent")),
      outerColor: d3.scaleOrdinal()
        .domain(Object.keys(dialecticalData))
        .range(Object.keys(dialecticalData).map(() => styles.colors.rings.outer)),
      middleColor: d3.scaleOrdinal()
        .domain(Object.keys(dialecticalData))
        .range(Object.keys(dialecticalData).map(() => styles.colors.rings.middle)),
      innerColor: d3.scaleOrdinal()
        .domain(Object.keys(dialecticalData))
        .range(Object.keys(dialecticalData).map(() => styles.colors.rings.inner))
    }
);
}
function _arcTween(d3){
return (
(arcGenerator) => function(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arcGenerator(i(t));
      };
    }
);
}
function _makeTextTransform(){
return (
(getCurrentRotationFn) => {
      return function(d, arcGenerator, currentRotationRadians = null) {
        const centroid = arcGenerator.centroid(d);
        const sliceMiddleAngle = (d.startAngle + d.endAngle) / 2;
        const currentRotation = currentRotationRadians !== null ? currentRotationRadians : (getCurrentRotationFn ? getCurrentRotationFn() : 0);
        const currentVisualAngle = sliceMiddleAngle + currentRotation;
        const normalizedAngle = ((currentVisualAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        let textRotationDegrees = (sliceMiddleAngle * 180) / Math.PI;
        if (normalizedAngle > Math.PI / 2 && normalizedAngle < 3 * Math.PI / 2) {
          textRotationDegrees += 180;
        }
        return `translate(${centroid[0]}, ${centroid[1]}) rotate(${textRotationDegrees})`;
      }
    }
);
}
function _makeAxisModule(d3){
return (
({ coordinateGroup, defs, pie, radii, styles, getDataToUse, getOppositePrefix, dialecticalData }) => {
      function updateCoordinateNumbersOpacities() {
        const units = Object.keys(dialecticalData);
        const middleData = getDataToUse().middle;
        coordinateGroup.selectAll("text.coordinate-number").each(function() {
          const sliceIndex = parseInt(d3.select(this).attr("data-slice-index"));
          const unitId = units[sliceIndex];
          if (unitId) {
            const sliceData = middleData.find(d => d.unitId === unitId);
            const opacity = sliceData ? sliceData.opacity : 1;
            d3.select(this)
              .transition()
              .duration(styles.durations.normal)
              .style("opacity", opacity);
          }
        });
      }

      function updateAxisPositions(focusedUnitId = null) {
        if (!focusedUnitId) {
          updateCoordinateNumbersOpacities();
          return;
        }
        coordinateGroup.selectAll(".coordinate-circle").remove();
        coordinateGroup.selectAll(".coordinate-symbol").remove();
        const dataToUse = getDataToUse();
        const pieData = pie(dataToUse.middle);
        const focusedSlice = pieData.find(d => d.data.unitId === focusedUnitId);
        let axisAngle;
        if (focusedSlice) {
          axisAngle = focusedSlice.startAngle - Math.PI / 2;
        } else {
          const units = Object.keys(dialecticalData);
          const numSlices = units.length;
          const angleStep = (2 * Math.PI) / numSlices;
          axisAngle = (numSlices / 2 * angleStep) - Math.PI / 2;
        }
        const axisAngles = [axisAngle, axisAngle + Math.PI];
        const ringRadii = [radii.centerRadius, radii.middleRadius, radii.outerRadius];
        const axisColors = [styles.colors.text.inner, styles.colors.text.middle, styles.colors.text.outer];

        // Check if opposite unit exists in current data
        const oppositeUnitId = getOppositePrefix(focusedUnitId);
        const oppositeExists = dataToUse.middle.some(d => d.unitId === oppositeUnitId);

        axisAngles.forEach((angle, sideIndex) => {
          // Skip the opposite side if it doesn't exist in the current data
          if (sideIndex === 1 && !oppositeExists) return;

          ringRadii.forEach((radius, ringIndex) => {
            const angleOffset = 8 / radius;
            const rotatedAngle = angle + angleOffset;
            const x = (radius-8) * Math.cos(rotatedAngle);
            const y = (radius-8) * Math.sin(rotatedAngle);
            const x2 = (radius) * Math.cos(angle);
            const y2 = (radius) * Math.sin(angle);
            let clipUnitId = sideIndex === 0 ? focusedUnitId : getOppositePrefix(focusedUnitId);
            // Derive display label from cell name (keeps clip id stable with unitId)
            let clipLabel = clipUnitId;
            (function deriveClipLabel(){
              const dataToUse = getDataToUse();
              let pieData;
              if (ringIndex === 0) pieData = pie(dataToUse.inner);
              else if (ringIndex === 1) pieData = pie(dataToUse.middle);
              else pieData = pie(dataToUse.outer);
              const cell = pieData.find(d => d.data.unitId === clipUnitId);
              if (cell && cell.data && cell.data.name) clipLabel = cell.data.name;
            })();
            const clipId = `clip-${clipUnitId}-${sideIndex}-${ringIndex}`;
            const clipPath = defs.append("clipPath").attr("id", clipId);
            clipPath.append("path").attr("d", function() {
              const dataToUse = getDataToUse();
              let pieData, arcGen;
              if (ringIndex === 0) { // inner ring
                pieData = pie(dataToUse.inner);
                arcGen = d3.arc().innerRadius(styles.radii.hub).outerRadius(radii.centerRadius);
              } else if (ringIndex === 1) { // middle ring
                pieData = pie(dataToUse.middle);
                arcGen = d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius);
              } else { // outer ring
                pieData = pie(dataToUse.outer);
                arcGen = d3.arc().innerRadius(radii.innerRadius).outerRadius(radii.outerRadius);
              }
              const cellData = pieData.find(d => d.data.unitId === clipUnitId);
              const oppaciudad = cellData ? cellData.data.opacity : 1;
              d3.select(null);
              return cellData ? arcGen(cellData) : "";
            });
            coordinateGroup.append("circle")
              .attr("class", "coordinate-circle")
              .attr("cx", x2)
              .attr("cy", y2)
              .attr("r", 0)
              .style("fill", "#000")
              .style("opacity", 0)
              .style("clip-path", `url(#${clipId})`)
              .transition()
              .duration(500)
              .attr("r", 20)
              .style("opacity", 0.1);
            coordinateGroup.append("text")
              .attr("class", "coordinate-symbol")
              .attr("x", x)
              .attr("y", y)
              .style("text-anchor", "middle")
              .style("dominant-baseline", "central")
              .style("font-family", "Monaco, monospace")
              .style("font-size", "8px")
              .style("font-weight", styles.fonts.coordinates.weight)
              .style("fill", axisColors[ringIndex])
              .style("pointer-events", "none")
              .style("opacity", 1)
              .text(clipLabel);
          });
        });
        updateCoordinateNumbersOpacities();
      }
      return { updateCoordinateNumbersOpacities, updateAxisPositions };
    }
);
}
function _makeStepMode(d3){
return (
({
      dialecticalData,
      transformToNestedPieData,
      initializeBuildSteps,
      isThesisType,
      getOppositePrefix,
      pie,
      radii,
      styles,
      groups,
      helpers
    }) => {
      let animationData = {};
      let buildSteps = [];
      let currentStep = 0;
      function initializeAnimationData() {
        animationData = transformToNestedPieData(dialecticalData);
        ["invisible", "outer", "middle", "inner"].forEach(ringType => {
          animationData[ringType].forEach(item => { item.value = 0; });
        });
      }
      function initializeBuildStepsLocal() {
        buildSteps = initializeBuildSteps(dialecticalData);
        currentStep = 0;
      }
      function resetBuildState(cellVisibility, updateAllRings) {
        Object.keys(dialecticalData).forEach(cell => {
          cellVisibility[cell] = { invisible: true, outer: false, middle: true, inner: false };
        });
        initializeAnimationData();
        updateAllRings();
      }
      function executeStep(stepIndex, ctx) {
        if (stepIndex < 0 || stepIndex >= buildSteps.length) return;
        const step = buildSteps[stepIndex];
        switch (step.type) {
          case 'showWhite': {
            const pairId = getOppositePrefix(step.unitId);
            const currentCellFirstStep = buildSteps.findIndex(s => s.unitId === step.unitId && s.type === 'showWhite');
            const pairCellFirstStep = buildSteps.findIndex(s => s.unitId === pairId && s.type === 'showWhite');
            const isFirstOfPair = currentCellFirstStep < pairCellFirstStep;
            function setupFirstOfPair() {
              ["outer","middle","inner"].forEach(ringType => {
                const dataArray = animationData[ringType];
                const currentData = dataArray.find(d => d.unitId === step.unitId);
                const pairData = dataArray.find(d => d.unitId === pairId);
                if (currentData) currentData.value = 1;
                if (pairData) pairData.value = 1;
              });
              ctx.cellVisibility[step.unitId].outer = true;
              ctx.cellVisibility[step.unitId].inner = true;
              ctx.cellVisibility[step.unitId].middle = true;
              ctx.cellVisibility[pairId].outer = true;
              ctx.cellVisibility[pairId].inner = true;
              ctx.cellVisibility[pairId].middle = true;
              setTimeout(() => {
                ["outer","middle","inner"].forEach(ringType => {
                  const dataArray = animationData[ringType];
                  const pairData = dataArray.find(d => d.unitId === pairId);
                  if (pairData) pairData.opacity = 0;
                });
                ctx.updateAllRings();
              }, 100);
            }
            function setupSecondOfPair() {
              ["outer","middle","inner"].forEach(ringType => {
                const dataArray = animationData[ringType];
                const currentData = dataArray.find(d => d.unitId === step.unitId);
                if (currentData) currentData.opacity = 1;
              });
            }
            if (isFirstOfPair) setupFirstOfPair(); else setupSecondOfPair();
            ctx.focusPair(step.unitId, styles.durations.stepRotation);
            ctx.updateAllRings();
            const latestPieData = pie(animationData.middle);
            const latestArcGen = d3.arc().innerRadius(radii.innerInnerRadius).outerRadius(radii.middleRadius);
            const currentRotation = ctx.getCurrentRotationFromDOM();
            groups.middleLabelsGroup.selectAll("text")
              .data(latestPieData, d => d.data.unitId)
              .attr("transform", d => helpers.calculateTextTransform(d, latestArcGen, currentRotation))
              .each(function(d) {
                const textElement = d3.select(this);
                const baseSizes = styles.fonts.labels.baseSize;
                textElement.style("font-size", `${baseSizes.middle}px`);
                textElement.selectAll("tspan").remove();
                const text = d.data.fullText || d.data.name;
                const arcDatum = latestPieData.find(p => p.data.unitId === d.data.unitId);
                const constraints = helpers.getTextConstraints("middle", arcDatum);
                helpers.wrapText(textElement, text, constraints);
              });
            setTimeout(() => {
              ctx.hideCell(step.unitId, "outer");
              ctx.hideCell(step.unitId, "inner");
              setTimeout(() => {
                groups.outerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
                groups.innerGroup.selectAll("path").filter(d => d.data.unitId === step.unitId).style("opacity", 1);
              }, styles.durations.stepRotation + 50);
            }, 100);
            break;
          }
          case 'showGreen':
            ctx.showCell(step.unitId, "inner");
            break;
          case 'showRed':
            ctx.showCell(step.unitId, "outer");
            break;
        }
      }
      function startStepMode(ctx) {
        ctx.setIsStepMode(true);
        initializeBuildStepsLocal();
        resetBuildState(ctx.cellVisibility, ctx.updateAllRings);
        ctx.clearFocus();
        ctx.resetZoom();
        ctx.hideCoordinates();
      }
      function stepForward(ctx) {
        if (!ctx.getIsStepMode() || currentStep >= buildSteps.length) return false;
        executeStep(currentStep, ctx);
        currentStep++;
        return true;
      }
      function stepBackward(ctx) {
        if (!ctx.getIsStepMode() || currentStep <= 0) return false;
        currentStep--;
        resetBuildState(ctx.cellVisibility, ctx.updateAllRings);
        for (let i = 0; i < currentStep; i++) executeStep(i, ctx);
        return true;
      }
      function resetToFull(ctx) {
        ctx.setIsStepMode(false);
        currentStep = 0;
        animationData = {};
        Object.keys(ctx.cellVisibility).forEach(cell => {
          ctx.cellVisibility[cell] = { invisible: true, outer: true, middle: true, inner: true };
        });
        ctx.clearFocus();
        ctx.resetZoom();
        ctx.setRotationDirectly(0);
        ["invisible","outer","middle","inner"].forEach(ringType => {
          ctx.nestedData[ringType].forEach(item => {
            const originalItem = ctx.originalNestedData[ringType].find(orig => orig.unitId === item.unitId);
            item.opacity = originalItem ? originalItem.opacity : 1;
          });
        });
        ctx.updateAllRings();
        ctx.showCoordinates();
        ctx.updateAxisPositions(ctx.cells[0]);
        ctx.rotateToSlice(ctx.cells[0],undefined,true);
      }
      function getCurrentStepInfo(ctx) {
        if (!ctx.getIsStepMode()) return null;
        const totalSteps = buildSteps.length;
        if (currentStep === 0) {
          return { current: currentStep, total: totalSteps, unit: "none", stepType: "start", canStepForward: currentStep < totalSteps, canStepBackward: false };
        }
        const step = buildSteps[currentStep - 1];
        const stepTypeMap = { 'showWhite': 'statement', 'showGreen': 'positive', 'showRed': 'negative' };
        return { current: currentStep, total: totalSteps, unit: step.unitId, stepType: stepTypeMap[step.type], canStepForward: currentStep < totalSteps, canStepBackward: currentStep > 0 };
      }
      return {
        get animationData() { return animationData; },
        get buildSteps() { return buildSteps; },
        startStepMode,
        stepForward,
        stepBackward,
        resetToFull,
        getCurrentStepInfo
      };
    }
);
}
function _chart(styles,radii,d3,selectedFont,dialecticalData,arcs,makeTextTransform,pie,transformToNestedPieData,makeAxisModule,getOppositePrefix,colorScales,getTextConstraints,wrapText,isThesisType,arcTween,makeRings,makeArrowsModule,arrowUtilities,parseArrowConnections,arrowConnections,flowConnections,makeStepMode,initializeBuildSteps){
return (
(() => {

    let isTouchDragging = false;
    let touchDragStart = null;
    const TOUCH_DRAG_THRESHOLD = 8;
    let isRotating = false;
    let rotationPromise = null;

    const height = styles.height;
    const { outerRadius, innerRadius, middleRadius, innerInnerRadius, centerRadius } = radii;

    // Create SVG with centered viewBox
    const svg = d3.create("svg")
      .attr("viewBox", [-styles.width/2, -styles.height/2, styles.width, styles.height])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font-family", `${selectedFont}, sans-serif`);

    // State variables
    let focusedPair = null;
    let clickedSlice = null;
    let clickedCell = null;
    let activeZoom = null;
    let cellVisibility = {};

    function updateChartValue() {
    svg.node().value = {
      focusedPair,
      clickedSlice,
      clickedCell,
      currentRotation: getCurrentRotationFromDOM()
    };
    svg.node().dispatchEvent(new CustomEvent("input"));
    }

    // Double tap detection for zoom reset
    let lastTapTime = 0;
    const DOUBLE_TAP_DELAY = 300; // 300ms window for double tap

    // Helper function to get current rotation from DOM (eliminates state tracking)
    function getCurrentRotationFromDOM() {
      const transform = rotationGroup.attr("transform") || "";
      const rotateMatch = transform.match(/rotate\(([-\d.]+)\)/);
      if (rotateMatch) {
        return parseFloat(rotateMatch[1]) * Math.PI / 180; // Convert to radians
      }
      return 0;
    }

    // Helper function to set rotation directly on DOM (no state tracking)
    function setRotationDirectly(radians) {
      const degrees = (radians * 180) / Math.PI;
      rotationGroup.attr("transform", `rotate(${degrees})`);
      // Update text positions immediately
      updateTextPositions(degrees);
      // Update chart value and dispatch event
      updateChartValue();
    }

    // Helper function to get rotated centroid using simple matrix transform
    function getRotatedCentroid(rawCentroid, currentRotation) {
      // Simple rotation matrix: [x*cos - y*sin, x*sin + y*cos]
      const rotatedX = rawCentroid[0] * Math.cos(currentRotation) - rawCentroid[1] * Math.sin(currentRotation);
      const rotatedY = rawCentroid[0] * Math.sin(currentRotation) + rawCentroid[1] * Math.cos(currentRotation);

      return [rotatedX, rotatedY];
    }

    // Step-by-step animation state
    let isStepMode = false;

    // Initialize cell visibility
    const cells = Object.keys(dialecticalData);
    cells.forEach(cell => {
      cellVisibility[cell] = {
        invisible: true,  // Start visible for normal mode
        outer: true,  
        middle: true,
        inner: true
      };
    });

    // Add background rectangle for reset clicks
    svg.append("rect")
      .attr("class", "background")
      .attr("x", -styles.width/2)
      .attr("y", -styles.height/2)
      .attr("width", styles.width)
      .attr("height", styles.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("click", resetZoom);

    // NEW TRANSFORM HIERARCHY:
    // svg (D3 zoom applied here)
    //   zoomGroup (zoom applied FIRST - D3 zoom controls this)
    //     rotationGroup (rotation applied SECOND - rotates the zoomed content)
    //       contentGroup (actual wheel content)
    const zoomGroup = svg.append("g").attr("class", "zoom-group");
    const rotationGroup = zoomGroup.append("g").attr("class", "rotation-group");
    const contentGroup = rotationGroup.append("g").attr("class", "content-group");

    // Add large invisible circle for better mobile touch target (in rotation group so it rotates with wheel)
    const dragCircle = rotationGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", styles.radii.drag) // Larger than outerRadius for easier touch
      .style("fill", "transparent")
      .style("pointer-events", "none") // FIXED: Don't block clicks - only handle drag
      .style("cursor", "grab");

    // Create zoom behavior (disable panning, only allow programmatic zoom)
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .filter(event => true) // Disable all zoom interactions
      .on("zoom", zoomed);

    // FIXED: Bind zoom to svg - D3 zoom needs to control the main element
    //zoomGroup.call(zoom);

    // Drag behavior for rotation with mobile optimization
    let dragStartAngle = 0;
    let dragStartRotation = 0;



    // Apply mobile-friendly styles and drag behavior
    svg.style("touch-action", "none")  // Prevent default touch behaviors
       .style("user-select", "none");   // Prevent text selection

    // Add scroll-to-zoom functionality
    let hoveredCell = null;

    // Track hover state on cells
    function setHoveredCell(cell) {
      hoveredCell = cell;
    }

    // Add wheel event listener for scroll-to-zoom


    // FIXED: Apply drag behavior to the rotationGroup so it scales with zoom
    //rotationGroup.call(drag);

    // ===== TOUCH BEHAVIOR: Focus + Zoom to Slice =====
    // Touch events now simply focus the pair and zoom to the entire slice

    // Create pie generator (from separate cell)
    // uses: pie

    // Arc generators (from separate cell)
    const { invisibleArc, outerArc, middleArc, innerArc } = arcs;

    // Simple Text Rotation and Flipping Logic (from separate cell)
    const calculateTextTransform = makeTextTransform(getCurrentRotationFromDOM);

    // Reusable function to rotate wheel to center a slice at the top
    function rotateToSlice(unitId, duration = styles.durations.stepRotation, skipAnimation = false) {
      // Choose which data to use based on current mode
      const dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;

      // Calculate rotation needed to center the slice at the top
      const pieData = pie(dataToUse.middle);
      const targetSlice = pieData.find(d => d.data.unitId === unitId);

      if (!targetSlice) return;

      // Calculate the current angle of the slice center in the original data
      const sliceAngle = (targetSlice.startAngle + targetSlice.endAngle) / 2;

      // Simple calculation: to center this slice at the top, 
      // we need: sliceAngle + newRotation = 0
      // Therefore: newRotation = -sliceAngle
      const newRotation = -sliceAngle;

      // Get current rotation from DOM
      const startRotation = getCurrentRotationFromDOM();
      let rotationDelta = newRotation - startRotation;

      // Normalize rotation delta to always take the shortest path (-π to π)
      while (rotationDelta > Math.PI) rotationDelta -= 2 * Math.PI;
      while (rotationDelta < -Math.PI) rotationDelta += 2 * Math.PI;

      // If skipAnimation is true, set rotation immediately without transition
      if (skipAnimation) {
        const degrees = (newRotation * 180) / Math.PI;
        rotationGroup.attr("transform", `rotate(${degrees})`);
        updateTextPositions(degrees);
        updateChartValue();
        return Promise.resolve();
      }

      // Use D3 transition for smooth rotation
      const rotationTransition = d3.transition()
        .duration(duration)
        .ease(d3.easeCubicInOut);

      isRotating = true;

      rotationPromise = new Promise((resolve) => {
        rotationTransition
          .tween("rotate", function() {
            return function(t) {
              const currentRotation = startRotation + rotationDelta * t;
              const degrees = (currentRotation * 180) / Math.PI;
              rotationGroup.attr("transform", `rotate(${degrees})`);
              // Update text positions during transition
              updateTextPositions(degrees);
            };
          })
          .on("end", function(){
            isRotating = false;
            updateChartValue();
            resolve();
          })
          .on("interrupt", function(){
            isRotating = false;
            resolve();
          });
      });

      return rotationPromise;
    }

    // Create groups for each ring (in content group)
    const invisibleGroup = contentGroup.append("g").attr("class", "invisible-ring");
    const outerGroup = contentGroup.append("g").attr("class", "outer-ring");
    const middleGroup = contentGroup.append("g").attr("class", "middle-ring");
    const innerGroup = contentGroup.append("g").attr("class", "inner-ring");

    // Initialize data
    const nestedData = transformToNestedPieData(dialecticalData);
    const originalNestedData = JSON.parse(JSON.stringify(nestedData)); // Keep original opacity values

    // Create groups for labels (in content group)
    const invisibleLabelsGroup = contentGroup.append("g").attr("class", "invisible-labels");
    const outerLabelsGroup = contentGroup.append("g").attr("class", "outer-labels");
    const middleLabelsGroup = contentGroup.append("g").attr("class", "middle-labels");
    const innerLabelsGroup = contentGroup.append("g").attr("class", "inner-labels");

    // Add yellow center circle (axle/hub) (in content group)
    const centerCircle = contentGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", styles.radii.hub)  // Same as inner radius of green ring
      .style("fill", styles.colors.hub);

    // Add coordinate system BACK inside the content group so it gets rotation transforms
    const coordinateGroup = contentGroup.append("g").attr("class", "coordinate-system");

    // Shared <defs> for clip paths and arrow markers
    const defs = svg.append("defs");

    // Add circumference numbers at slice centers
    const numSlices = Object.keys(dialecticalData).length;
    const angleStep = (2 * Math.PI) / numSlices;
    const numberRadius = outerRadius + 15;



    // Add axis symbols at the center of each ring layer
    const ringRadii = [
      centerRadius,                // Inner ring center
      middleRadius,  // Middle ring center
      outerRadius        // Outer ring center
    ];

    //const symbols = ["T+", "T", "T-"]; // Positive, neutral, negative
    const axisColors = [styles.colors.text.inner, styles.colors.text.middle, styles.colors.text.outer];

    // Coordinate number opacity updates now handled inside axis module

    // Function to update axis positions is provided by axis module below

    // Initialize axis module and axes
    const axis = makeAxisModule({
      coordinateGroup,
      defs,
      pie,
      radii: { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius },
      styles,
      getDataToUse: () => (isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData),
      getOppositePrefix,
      dialecticalData
    });
    const updateAxisPositions = axis.updateAxisPositions;
    axis.updateAxisPositions();

    // Color scales (from separate cell)
    const { invisibleColor, outerColor, middleColor, innerColor } = colorScales;

    // Initialize data
    //const nestedData = transformToNestedPieData(dialecticalData);

    // arcTween helper from separate cell

    // Function to hide individual cell (sucking into inner ring)
    function hideCell(unitId, ringType) {
      if (!cellVisibility[unitId] || !cellVisibility[unitId][ringType]) return;

      cellVisibility[unitId][ringType] = false;

      let group, labelsGroup, targetRadius;
      switch(ringType) {
        case "invisible":
          group = invisibleGroup;
          labelsGroup = invisibleLabelsGroup;
          targetRadius = outerRadius;
          break;
        case "outer":
          group = outerGroup;
          labelsGroup = outerLabelsGroup;
          targetRadius = innerRadius;
          break;
        case "middle":
          group = middleGroup;
          labelsGroup = middleLabelsGroup;
          targetRadius = innerInnerRadius;
          break;
        case "inner":
          group = innerGroup;
          labelsGroup = innerLabelsGroup;
          targetRadius = 0;
          break;
      }

      // Hide cell with radius animation
      group.selectAll("path")
        .filter(d => d.data.unitId === unitId)
        .classed("hidden", true)
        .transition()
        .duration(styles.durations.stepRotation) // Mismatched name, but using for now
        .ease(d3.easeExpIn)
        .attrTween("d", function(d) {
          const currentData = d;

          return function(t) {
            let arcGen;
            if (ringType === "invisible") {
              const newInnerRadius = d3.interpolate(outerRadius, targetRadius)(t);
              const newOuterRadius = d3.interpolate(styles.radii.invisible, targetRadius)(t);
              arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
            } else if (ringType === "outer") {
              const newInnerRadius = d3.interpolate(innerRadius, targetRadius)(t);
              const newOuterRadius = d3.interpolate(outerRadius, targetRadius)(t);
              arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
            } else if (ringType === "middle") {
              const newInnerRadius = d3.interpolate(innerInnerRadius, targetRadius)(t);
              const newOuterRadius = d3.interpolate(middleRadius, targetRadius)(t);
              arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
            } else {
              const newInnerRadius = d3.interpolate(0, targetRadius)(t);
              const newOuterRadius = d3.interpolate(centerRadius, targetRadius)(t);
              arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
            }
            return arcGen(currentData);
          };
        })
        .style("opacity", d3.interpolate(1, 0))
        .on("end", function(d) {
          // Restore data binding after hide animation
          this._current = d;
        });

      // Hide label
      labelsGroup.selectAll("text")
        .filter(d => d.data.unitId === unitId)
        .transition()
        .duration(styles.durations.stepRotation)
        .style("opacity", 0);
    }

    // Function to show individual cell (expanding from inner ring)
    function showCell(unitId, ringType) {
      if (!cellVisibility[unitId] || cellVisibility[unitId][ringType]) return;

      cellVisibility[unitId][ringType] = true;

      let group, labelsGroup, startRadius, endInnerRadius, endOuterRadius;
      switch(ringType) {
        case "invisible":
          group = invisibleGroup;
          labelsGroup = invisibleLabelsGroup;
          startRadius = outerRadius;
          endInnerRadius = outerRadius;
          endOuterRadius = styles.radii.invisible;
          break;
        case "outer":
          group = outerGroup;
          labelsGroup = outerLabelsGroup;
          startRadius = innerRadius;
          endInnerRadius = innerRadius;
          endOuterRadius = outerRadius;
          break;
        case "middle":
          group = middleGroup;
          labelsGroup = middleLabelsGroup;
          startRadius = innerInnerRadius;
          endInnerRadius = innerInnerRadius;
          endOuterRadius = middleRadius;
          break;
        case "inner":
          group = innerGroup;
          labelsGroup = innerLabelsGroup;
          startRadius = centerRadius;
          endInnerRadius = styles.radii.hub;
          endOuterRadius = centerRadius;
          break;
      }

      // Show cell with radius animation
      group.selectAll("path")
        .filter(d => d.data.unitId === unitId)
        .classed("hidden", false)
        .transition()
        .duration(styles.durations.stepRotation)
        .ease(d3.easeExpOut)
        .attrTween("d", function(d) {
          const currentData = d;

          return function(t) {
            const newInnerRadius = d3.interpolate(startRadius, endInnerRadius)(t);
            const newOuterRadius = d3.interpolate(startRadius, endOuterRadius)(t);
            const arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);
            return arcGen(currentData);
          };
        })
        .style("opacity", d3.interpolate(0, ringType === "invisible" ? 1 : ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8))


      // Show label with position animation
      labelsGroup.selectAll("text")
        .filter(d => d.data.unitId === unitId)
        .style("font-size", function() {
          // Set font size immediately when text becomes visible
          const baseSizes = styles.fonts.labels.baseSize;
          return `${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`;
        })
        .each(function(d) {
          // Do text wrapping immediately with current data
          const textElement = d3.select(this);
          const baseSizes = styles.fonts.labels.baseSize;
          textElement.style("font-size", `${ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`);
          textElement.selectAll("tspan").remove();
          const text = d.data.fullText || d.data.name;

          // Use the current data (either animationData if in step mode, or nestedData otherwise)
          const dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
          let pieData, arcGen;
          if (ringType === "invisible") {
            pieData = pie(dataToUse.invisible);
            arcGen = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
          } else if (ringType === "outer") {
            pieData = pie(dataToUse.outer);
            arcGen = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
          } else if (ringType === "middle") {
            pieData = pie(dataToUse.middle);
            arcGen = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
          } else {
            pieData = pie(dataToUse.inner);
            arcGen = d3.arc().innerRadius(30).outerRadius(centerRadius);
          }
          const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
          const constraints = getTextConstraints(ringType, arcDatum);
          wrapText(textElement, text, constraints);
        })
        .transition()
        .duration(styles.durations.stepRotation)
        .ease(d3.easeExpOut)
        .attrTween("transform", function(d) {
          const currentData = d;

          return function(t) {
            const newInnerRadius = d3.interpolate(startRadius, endInnerRadius)(t);
            const newOuterRadius = d3.interpolate(startRadius, endOuterRadius)(t);
            const arcGen = d3.arc().innerRadius(newInnerRadius).outerRadius(newOuterRadius);

            // Use the simple text transform function
            return calculateTextTransform(currentData, arcGen);
          };
        })
        .style("opacity", 1);
    }

    // Change data moved to makeRings

    function unfocus() {
      // Choose which data to modify
      const dataToModify = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;

      // Reset all opacities to original values
      ["invisible", "outer", "middle", "inner"].forEach(ringType => {
        dataToModify[ringType].forEach(item => {
          const originalItem = originalNestedData[ringType].find(orig => orig.unitId === item.unitId);
          item.opacity = originalItem ? originalItem.opacity : 1;
        });
      });

      focusedPair = null;
      clickedSlice = null;
      clickedCell = null;
      updateAxisPositions();
      updateAllRings();
      //updateOverlays();
      updateChartValue();
    }

    // Focus pair function
    async function focusPair(clickedUnitId) {
      if (isRotating && rotationPromise) {
        try { await rotationPromise; } catch (e) {}
      }
      // Choose which data to modify
      const dataToModify = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;

      const isThesis = isThesisType(clickedUnitId);
      const pairId = dialecticalData[clickedUnitId].pairWith;
      const thesis = isThesis ? clickedUnitId : pairId;
      const antithesis = isThesis ? pairId : clickedUnitId;   

      const isAlreadyFocused = focusedPair && 
        focusedPair.thesis === thesis && 
        focusedPair.antithesis === antithesis;



      // Check if clickedUnitId is within 90 degrees of 0 degrees (or 180 degrees)
      const sliceData = pie(dataToModify.middle).find(d => d.data.unitId === clickedUnitId);
      const sliceAngle = (sliceData.startAngle + sliceData.endAngle)/2;
      let visualAngle = (sliceAngle + getCurrentRotationFromDOM()) % (2 * Math.PI);
      let rotateUnitId = clickedUnitId;
      // Round down to the nearest degree (in radians)
      visualAngle = Math.floor(visualAngle * 180 / Math.PI);
      if(!(visualAngle <= 90 || visualAngle >= 270) && !isStepMode) {
        rotateUnitId = pairId;
        //console.log("is not within 90 degrees. visualAngle: " + visualAngle);
      }

      if (isAlreadyFocused) {
        if(isStepMode) {
          rotateToSlice(rotateUnitId);
          clickedSlice = clickedUnitId;
          focusedPair = { thesis, antithesis };
          updateChartValue();
          updateAxisPositions();
          return;
        }
        if(clickedUnitId == clickedSlice) {
          focusedPair = { thesis, antithesis };
          updateChartValue();
          updateAxisPositions();
          return;
        }
        focusedPair = null;
        clickedSlice = null;
        // Reset all opacities to original values
        ["invisible", "outer", "middle", "inner"].forEach(ringType => {
          dataToModify[ringType].forEach(item => {
            const originalItem = originalNestedData[ringType].find(orig => orig.unitId === item.unitId);
            item.opacity = originalItem ? originalItem.opacity : 1;
          });
        });
        // Reset axes to default positions
        updateAxisPositions();
      } else {
        focusedPair = { thesis, antithesis };

        // Rotate to center the clicked slice at the top
        rotateToSlice(rotateUnitId, styles.durations.stepRotation);

        // Dim all cells first (but only if they were originally visible)
        ["invisible", "outer", "middle", "inner"].forEach(ringType => {
          dataToModify[ringType].forEach(item => {
            const originalItem = originalNestedData[ringType].find(orig => orig.unitId === item.unitId);

            // Only dim if originally visible (check value, not opacity)
            if (originalItem && originalItem.value > 0) {
              item.opacity = 0.3;
            } else {
              item.opacity = 0; // Keep hidden
            }
          });
        });
        // Highlight the focused pair (restore original opacity)
        ["invisible", "outer", "middle", "inner"].forEach(ringType => {
          dataToModify[ringType].forEach(item => {
            if (item.unitId === thesis || item.unitId === antithesis) {
              const originalItem = originalNestedData[ringType].find(orig => orig.unitId === item.unitId);
              const originalOpacity = originalItem ? originalItem.opacity : 1;
              item.opacity = originalOpacity; // Restore original, don't force to 1
            }
          });
        });
        // Update axes to focus on the pair
        updateAxisPositions(clickedUnitId);
      }

      // Re-render with updated opacity
      if (isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0) {
        rings.changeData("invisible", stepMode.animationData.invisible, invisibleArc);
        rings.changeData("outer", stepMode.animationData.outer, outerArc);
        rings.changeData("middle", stepMode.animationData.middle, middleArc);
        rings.changeData("inner", stepMode.animationData.inner, innerArc);
      } else {
        updateAllRings();
      }

      // --- MAKE CHART REACTIVE: update .value and dispatch input event ---
      clickedSlice = clickedUnitId; 
      updateChartValue();
    }

    // Zoom functions


    // Function to zoom to entire slice (all three rings of a unitId)


    function resetZoom() {
      zoomGroup.selectAll("path.cell")  // Only apply to pie chart cells, not arrows
        .style("stroke", function() {
          const ringType = d3.select(this.parentNode).attr("class");
          return ringType && ringType.includes("middle") ? styles.colors.strokes.middleRing : styles.colors.strokes.default;
        })
        .style("stroke-width", function() {
          const ringType = d3.select(this.parentNode).attr("class");
          return ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
        });
      activeZoom = null;

      // FIXED: Apply zoom reset to svg - D3 zoom controls the main element  
      svg.transition()
        .duration(styles.durations.normal)
        .call(zoom.transform, d3.zoomIdentity);
    }

    // ===== INITIALIZE LONG PRESS HANDLER =====
    // Now that zoomToCell is defined, initialize the long press handler
    // REMOVED: Long press not needed anymore - touch events do focus + zoom directly

    // Drag functions for rotation


    // Update transform function with mobile optimization
    let transformUpdateTimeout;
    let isUpdatingTransform = false;

    function updateTextPositions(rotationDegrees) {
      isUpdatingTransform = true;

      // Convert degrees to radians once
      const currentRotationRadians = (rotationDegrees * Math.PI) / 180;

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        // PERFORMANCE: Update all cell text using the optimized transform function
        // Pass rotation to avoid repeated DOM queries
        const invisibleTexts = invisibleLabelsGroup.selectAll("text");
        const outerTexts = outerLabelsGroup.selectAll("text");
        const middleTexts = middleLabelsGroup.selectAll("text");
        const innerTexts = innerLabelsGroup.selectAll("text");

        invisibleTexts.attr("transform", function(d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, invisibleArc, currentRotationRadians);
        });

        outerTexts.attr("transform", function(d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, outerArc, currentRotationRadians);
        });

        middleTexts.attr("transform", function(d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, middleArc, currentRotationRadians);
        });

        innerTexts.attr("transform", function(d) {
          if (!d) return this.getAttribute("transform"); // Keep existing if no data
          return calculateTextTransform(d, innerArc, currentRotationRadians);
        });

        // PERFORMANCE: Optimize coordinate system counter-rotation
        const counterRotationDegrees = -rotationDegrees;

        // Update coordinate numbers (more efficient transform calculation)
        coordinateGroup.selectAll("text.coordinate-number").attr("transform", function() {
          const x = parseFloat(d3.select(this).attr("x"));
          const y = parseFloat(d3.select(this).attr("y"));
          return `translate(${x}, ${y}) rotate(${counterRotationDegrees}) translate(${-x}, ${-y})`;
        });

        // Update coordinate symbols (more efficient transform calculation)
        coordinateGroup.selectAll("text.coordinate-symbol").attr("transform", function() {
          const x = parseFloat(d3.select(this).attr("x"));
          const y = parseFloat(d3.select(this).attr("y"));
          return `translate(${x}, ${y}) rotate(${counterRotationDegrees}) translate(${-x}, ${-y})`;
        });

        isUpdatingTransform = false;
      });
    }

    function zoomed(event) {
      const { transform } = event;

      // NEW: Apply zoom transform to zoomGroup (zoom happens first in hierarchy)
      // D3 applies transform to SVG, we redirect it to zoomGroup
      zoomGroup.attr("transform", transform);

      // Update stroke widths to maintain visual consistency at different zoom levels
      zoomGroup.selectAll("path.cell")
        .style("stroke-width", function() {
          const ringType = d3.select(this.parentNode).attr("class");
          const baseWidth = ringType && ringType.includes("middle") ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth;
          return (baseWidth / transform.k) + "px";
        });


    }

    // Update ring function
    function updateRing(group, labelsGroup, data, arcGenerator, ringType, colorScale) {
      const pieData = pie(data);

      const paths = group.selectAll("path")
        .data(pieData, d => d.data.name);

      const pathsEnter = paths.enter()
        .append("path")
        .attr("class", "cell")
        .attr("fill", d => colorScale(d.data.unitId))
        .attr("stroke", ringType === "middle" ? styles.colors.strokes.middleRing : styles.colors.strokes.default)
        .attr("stroke-width", ringType === "middle" ? styles.strokes.middleRingWidth : styles.strokes.defaultWidth)
        .attr("stroke-dasharray", "1,3") // Dotted border
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.3)
        .style("opacity", d => {
          if (!cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
            return 0;
          }
          const baseOpacity = ringType === "outer" || ringType === "invisible" ? 1 : ringType === "middle" ? 0.9 : 0.8;
          return d.data.opacity * baseOpacity;
        })
        .attr("d", arcGenerator)
        .each(function(d) { this._current = d; })
        .on("click", function(event, d) {
          if (event.metaKey || event.ctrlKey) {
            //zoomToCell(event, d);
          } else {
            // Match touch behavior: focus pair and zoom to slice if not already zoomed
            //console.log('Mouse click - focusing slice:', d.data.unitId);
            //const isCurrentlyZoomed = activeZoom !== null;
            // Remove highlight from all cells with the same unitId
            d3.select(this.ownerSVGElement)
              .selectAll("path.cell")
              .style("stroke-dasharray", "1,3");
            const isCurrentlyZoomed = true;
            if(!focusedPair){
              focusPair(d.data.unitId);
              clickedCell = d.data;
            }
            else{
              if(focusedPair.thesis != d.data.unitId && focusedPair.antithesis != d.data.unitId){
                unfocus();
                clickedCell = null;
              }
              else{
                clickedCell = d.data;
                d3.select(this)
                .style("stroke-dasharray", "1,0");
                if(clickedCell && clickedCell.name == d.data.name) {
                  d3.select(this)
                  .style("cursor", "default");
                }
              }
            }
            updateChartValue();
            if (!isCurrentlyZoomed) {
              //console.log('Not zoomed - zooming to slice after rotation completes');
              setTimeout(() => {
                //zoomToSlice(d.data.unitId);
              }, styles.durations.stepRotation + 50);
            } else {
              //console.log('Already zoomed - rotation only, no zoom translation');
            }
          }
        })
        .on("touchstart", function(event, d) {
          event.preventDefault();
          const touch = event.touches && event.touches[0];
          if (touch) {
            touchDragStart = { x: touch.clientX, y: touch.clientY };
          } else {
            touchDragStart = null;
          }
          isTouchDragging = false;
        })
        .on("touchmove", function(event, d) {
          if (!touchDragStart) return;
          const touch = event.touches && event.touches[0];
          if (touch) {
            const dx = touch.clientX - touchDragStart.x;
            const dy = touch.clientY - touchDragStart.y;
            if (Math.sqrt(dx*dx + dy*dy) > TOUCH_DRAG_THRESHOLD) {
              isTouchDragging = true;
            }
          }
        })
        .on("touchend", function(event, d) {
          event.preventDefault();
          if (isTouchDragging) {
            // It was a drag, not a tap—do nothing
            isTouchDragging = false;
            touchDragStart = null;
            return;
          }
          // ... existing tap/focus logic ...
          const currentTime = Date.now();
          const timeSinceLastTap = currentTime - lastTapTime;
          if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
            // Double tap detected - reset zoom
            //console.log('Double tap detected - resetting zoom');
            resetZoom();
          } else {
            // Single tap - focus pair and zoom if not already zoomed
            //console.log('Single tap - focusing slice:', d.data.unitId);
            //const isCurrentlyZoomed = activeZoom !== null;
            const isCurrentlyZoomed = true;
            focusPair(d.data.unitId);
            if (!isCurrentlyZoomed) {
              //console.log('Not zoomed - zooming to slice after rotation completes');
              setTimeout(() => {
                //zoomToSlice(d.data.unitId);
              }, styles.durations.stepRotation + 50);
            } else {
              //console.log('Already zoomed - rotation only, no zoom translation');
            }
          }
          lastTapTime = currentTime;
          isTouchDragging = false;
          touchDragStart = null;
        })
        .on("touchcancel", function(event, d) {
          // Just prevent default on cancel
          event.preventDefault();
        })
        .on("mouseenter", function(event, d) {
          // Set hovered cell for scroll-to-zoom
          const parentClass = d3.select(this.parentNode).attr("class");
          const ringType = parentClass.includes("invisible") ? "invisible" :
                          parentClass.includes("outer") ? "outer" : 
                          parentClass.includes("middle") ? "middle" : "inner";
          setHoveredCell({ unitId: d.data.unitId, ringType: ringType });

          if(focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
            d3.select(this)
            .style("stroke-dasharray", "1,0");
            if(clickedCell && clickedCell.name != d.data.name) {
              d3.select(this)
              .style("cursor", "pointer");
            }
            else if(clickedCell && clickedCell.name == d.data.name) {
              d3.select(this)
              .style("cursor", "default");
            }
          }
          else if(focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId){
            d3.select(this)
            .style("cursor", "default")
            .style("opacity", ringType === "invisible" ? 0.2 : 1); // Show invisible ring faintly on hover
            let labelsGroup;
            if (ringType === "invisible") labelsGroup = invisibleLabelsGroup;
            else if (ringType === "outer") labelsGroup = outerLabelsGroup;
            else if (ringType === "middle") labelsGroup = middleLabelsGroup;
            else labelsGroup = innerLabelsGroup;
            labelsGroup.selectAll("text")
            .filter(text => text.data.unitId === d.data.unitId)
            .style("opacity", 1);
          }
          else{
            // Highlight all cells with the same unitId across all rings
            d3.select(this.ownerSVGElement)
            .selectAll("path.cell")
            .filter(cellD => cellD && cellD.data && cellD.data.unitId === d.data.unitId)
            .style("stroke-dasharray", "1,0")
            .style("cursor", "pointer")
            .style("opacity", function() {
              const thisRingType = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null;
              return thisRingType === "invisible" ? 0.2 : null; // Show invisible ring faintly on hover
            });
          }

        })
        .on("mouseleave", function(event, d) {
          setHoveredCell(null);

          if(focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
            if(clickedCell && clickedCell.name != d.data.name) {
              d3.select(this)
              .style("stroke-dasharray", "1,3");
            }

          }
          else if(focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId) {
            d3.select(this)
            .style("opacity", 0.3);
            let labelsGroup;
            if (ringType === "invisible") labelsGroup = invisibleLabelsGroup;
            else if (ringType === "outer") labelsGroup = outerLabelsGroup;
            else if (ringType === "middle") labelsGroup = middleLabelsGroup;
            else labelsGroup = innerLabelsGroup;
            labelsGroup.selectAll("text")
            .filter(text => text.data.unitId === d.data.unitId)
            .style("opacity", 0.3);

            if(ringType === "invisible"){
              d3.select(this)
              .style("opacity", 0);
            }
          }
          else{
            // Remove highlight from all cells with the same unitId
            d3.select(this.ownerSVGElement)
              .selectAll("path.cell")
              .filter(cellD => cellD && cellD.data && cellD.data.unitId === d.data.unitId)
              .style("stroke-dasharray", "1,3")
              .style("opacity", function() {
                const thisRingType = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null;
                return thisRingType === "invisible" ? 0 : null; // Hide invisible ring when not hovering
              });

          }
        });

      pathsEnter.append("title")
        .text(d => d.data.fullText);

      paths.merge(pathsEnter)
        .transition()
        .duration(styles.durations.normal)
        .attrTween("d", arcTween(arcGenerator))
        .style("opacity", d => {
          if (!cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
            return 0;
          }
          if (ringType === "invisible") {
            return 0; // Paths are invisible, only text shows
          }
          const baseOpacity = ringType === "outer" ? 1 : ringType === "middle" ? 0.9 : 0.8;
          return d.data.opacity * baseOpacity;
        });

      paths.exit()
        .transition()
        .duration(styles.durations.normal)
        .style("opacity", 0)
        .remove();

      updateLabels(labelsGroup, pieData, arcGenerator, ringType);
    }



    function updateLabels(labelsGroup, pieData, arcGenerator, ringType) {
      const labels = labelsGroup.selectAll("text")
        .data(pieData, d => d.data.name);

      const labelsEnter = labels.enter()
        .append("text")
        .attr("class", "cell-label")
        .style("opacity", d => {
          if (d.data.value === 0 || !cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
            return 0;
          }
          return d.data.opacity;
        })
        .attr("transform", function(d) {
          // Use the simple text transform function
          return calculateTextTransform(d, arcGenerator);
        })
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .style("font-family", styles.fonts.family)
        .style("font-size", function(d) {
          const baseSizes = styles.fonts.labels.baseSize;
          return `${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`;
        })
        .style("font-weight", styles.fonts.labels.weight)
        .style("fill", function(d) {
          const textColors = styles.colors.text;
          if (ringType === "invisible") return 'black';
          if (ringType === "inner") return textColors.inner;
          if (ringType === "outer") return textColors.outer;
          return textColors.middle;
        })
        .style("pointer-events", "none")
        .each(function(d) {
          // Always apply text wrapping on create with up-to-date arc data
          const textElement = d3.select(this);
          // Ensure font size is set before wrapping
          const baseSizes = styles.fonts.labels.baseSize;
          textElement.style("font-size", `${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`);

          const text = d.data.fullText || d.data.name;
          // Get latest arc data for this cell
          let pieData, arcGen;
          const dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
          if (ringType === "invisible") {
            pieData = pie(dataToUse.invisible);
            arcGen = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
          } else if (ringType === "outer") {
            pieData = pie(dataToUse.outer);
            arcGen = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
          } else if (ringType === "middle") {
            pieData = pie(dataToUse.middle);
            arcGen = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
          } else {
            pieData = pie(dataToUse.inner);
            arcGen = d3.arc().innerRadius(30).outerRadius(centerRadius);
          }
          const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
          const constraints = getTextConstraints(ringType, arcDatum);
          wrapText(textElement, text, constraints);
        });

      labels.merge(labelsEnter)
        .transition()
        .duration(styles.durations.normal)
        .attr("transform", function(d) {
          // Use the simple text transform function
          return calculateTextTransform(d, arcGenerator);
        })
        .style("opacity", d => {
          if (d.data.value === 0 || !cellVisibility[d.data.unitId] || !cellVisibility[d.data.unitId][ringType]) {
            return 0;
          }
          return d.data.opacity;
        })
        .on("end", function(d) {
          // Apply text wrapping after transition completes with up-to-date arc data
          if (d && d.data) {
            const textElement = d3.select(this);
            // Ensure font size is set before wrapping
            const baseSizes = styles.fonts.labels.baseSize;
            textElement.style("font-size", `${ringType === "invisible" ? baseSizes.outer : ringType === "outer" ? baseSizes.outer : ringType === "middle" ? baseSizes.middle : baseSizes.inner}px`);

            const text = d.data.fullText || d.data.name;
            let pieData, arcGen;
            const dataToUse = isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData;
            if (ringType === "invisible") {
              pieData = pie(dataToUse.invisible);
              arcGen = d3.arc().innerRadius(outerRadius).outerRadius(styles.radii.invisible);
            } else if (ringType === "outer") {
              pieData = pie(dataToUse.outer);
              arcGen = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
            } else if (ringType === "middle") {
              pieData = pie(dataToUse.middle);
              arcGen = d3.arc().innerRadius(innerInnerRadius).outerRadius(middleRadius);
            } else {
              pieData = pie(dataToUse.inner);
              arcGen = d3.arc().innerRadius(30).outerRadius(centerRadius);
            }
            const arcDatum = pieData.find(p => p.data.unitId === d.data.unitId);
            const constraints = getTextConstraints(ringType, arcDatum);
            wrapText(textElement, text, constraints);
          }
        });

      labels.exit()
        .transition()
        .duration(styles.durations.normal)
        .style("opacity", 0)
        .remove();
    }

    // Update all rings helper
    const bindCellEvents = (selection, ringType) => {
      selection
        .on("click", function(event, d) {
          if (event.metaKey || event.ctrlKey) {
            // no-op for zoom here
          } else {
            d3.select(this.ownerSVGElement).selectAll("path.cell").style("stroke-dasharray", "1,3");
            const isCurrentlyZoomed = true;
            if(!focusedPair){
              focusPair(d.data.unitId);
              clickedCell = d.data;
            } else {
              if(focusedPair.thesis != d.data.unitId && focusedPair.antithesis != d.data.unitId){
                unfocus();
                clickedCell = null;
              } else {
                clickedCell = d.data;
                d3.select(this).style("stroke-dasharray", "1,0");
                if(clickedCell && clickedCell.name == d.data.name) {
                  d3.select(this).style("cursor", "default");
                }
              }
            }
            updateChartValue();
            if (!isCurrentlyZoomed) {
              setTimeout(() => {}, styles.durations.stepRotation + 50);
            }
          }
        })
        .on("mouseenter", function(event, d) {
          const parentClass = d3.select(this.parentNode).attr("class");
          const ringTypeLocal = parentClass.includes("invisible") ? "invisible" : parentClass.includes("outer") ? "outer" : parentClass.includes("middle") ? "middle" : "inner";
          setHoveredCell({ unitId: d.data.unitId, ringType: ringTypeLocal });
          if(focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
            d3.select(this).style("stroke-dasharray", "1,0");
            if(clickedCell && clickedCell.name != d.data.name) { d3.select(this).style("cursor", "pointer"); }
            else if(clickedCell && clickedCell.name == d.data.name) { d3.select(this).style("cursor", "default"); }
          } else if(focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId){
            d3.select(this).style("cursor", "default").style("opacity", ringTypeLocal === "invisible" ? 0.2 : 1);
            let labelsGroup = ringTypeLocal === "invisible" ? invisibleLabelsGroup : ringTypeLocal === "outer" ? outerLabelsGroup : ringTypeLocal === "middle" ? middleLabelsGroup : innerLabelsGroup;
            labelsGroup.selectAll("text").filter(text => text.data.unitId === d.data.unitId).style("opacity", 1);
          } else {
            d3.select(this.ownerSVGElement).selectAll("path.cell")
              .filter(cellD => cellD && cellD.data && cellD.data.unitId === d.data.unitId)
              .style("stroke-dasharray", "1,0").style("cursor", "pointer").style("opacity", function() {
                const thisRingType = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null;
                return thisRingType === "invisible" ? 0.2 : null;
              });
          }
        })
        .on("mouseleave", function(event, d) {
          setHoveredCell(null);
          const parentClass = d3.select(this.parentNode).attr("class");
          const ringTypeLocal = parentClass.includes("invisible") ? "invisible" : parentClass.includes("outer") ? "outer" : parentClass.includes("middle") ? "middle" : "inner";
          if(focusedPair && d.data.pairId === dialecticalData[focusedPair.thesis].pairId) {
            if(clickedCell && clickedCell.name != d.data.name) { d3.select(this).style("stroke-dasharray", "1,3"); }
          } else if(focusedPair && d.data.pairId !== dialecticalData[focusedPair.thesis].pairId) {
            d3.select(this).style("opacity", 0.3);
            let labelsGroup = ringTypeLocal === "invisible" ? invisibleLabelsGroup : ringTypeLocal === "outer" ? outerLabelsGroup : ringTypeLocal === "middle" ? middleLabelsGroup : innerLabelsGroup;
            labelsGroup.selectAll("text").filter(text => text.data.unitId === d.data.unitId).style("opacity", 0.3);
            if(ringTypeLocal === "invisible"){ d3.select(this).style("opacity", 0); }
          } else {
            d3.select(this.ownerSVGElement).selectAll("path.cell")
              .filter(cellD => cellD && cellD.data && cellD.data.unitId === d.data.unitId)
              .style("stroke-dasharray", "1,3")
              .style("opacity", function() { const t = d3.select(this.parentNode).attr("class").includes("invisible") ? "invisible" : null; return t === "invisible" ? 0 : null; });
          }
        })
        .on("touchstart", function(event, d) {
          event.preventDefault();
          const touch = event.touches && event.touches[0];
          touchDragStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
          isTouchDragging = false;
        })
        .on("touchmove", function(event, d) {
          if (!touchDragStart) return;
          const touch = event.touches && event.touches[0];
          if (touch) {
            const dx = touch.clientX - touchDragStart.x;
            const dy = touch.clientY - touchDragStart.y;
            if (Math.sqrt(dx*dx + dy*dy) > TOUCH_DRAG_THRESHOLD) { isTouchDragging = true; }
          }
        })
        .on("touchend", function(event, d) {
          event.preventDefault();
          if (isTouchDragging) { isTouchDragging = false; touchDragStart = null; return; }
          const currentTime = Date.now();
          const timeSinceLastTap = currentTime - lastTapTime;
          if (timeSinceLastTap < DOUBLE_TAP_DELAY) { resetZoom(); }
          else {
            const isCurrentlyZoomed = true;
            focusPair(d.data.unitId);
            if (!isCurrentlyZoomed) { setTimeout(() => {}, styles.durations.stepRotation + 50); }
          }
          lastTapTime = currentTime;
          isTouchDragging = false;
          touchDragStart = null;
        })
        .on("touchcancel", function(event) { event.preventDefault(); });
    };
    const rings = makeRings({
      groups: { invisibleGroup, outerGroup, middleGroup, innerGroup },
      labels: { invisibleLabelsGroup, outerLabelsGroup, middleLabelsGroup, innerLabelsGroup },
      arcs: { invisibleArc, outerArc, middleArc, innerArc },
      colorScales: { invisibleColor, outerColor, middleColor, innerColor },
      styles,
      pie,
      radii: { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius },
      helpers: { calculateTextTransform, wrapText, getTextConstraints },
      getDataToUse: () => (isStepMode && stepMode.animationData && Object.keys(stepMode.animationData).length > 0 ? stepMode.animationData : nestedData),
      getCellVisibility: (unitId, ringType) => (cellVisibility[unitId] && cellVisibility[unitId][ringType]),
      bindCellEvents
    });
    const updateAllRings = rings.updateAllRings;

    // ===== ARROW DRAWING FUNCTIONALITY (moved to arrows-module cell) =====
    const arrows = makeArrowsModule({
      defs,
      contentGroup,
      centerCircle,
      nestedData,
      pie,
      radii: { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius },
      styles,
      arrowUtilities
    });
    // Keep label/coordinate groups above arrows
    invisibleLabelsGroup.raise();
    outerLabelsGroup.raise();
    middleLabelsGroup.raise();
    innerLabelsGroup.raise();
    coordinateGroup.raise();
    function clearArrows() {
      arrows.clearArrows();
    }
    function drawArrow(from, to, color = "#666", strokeWidth = 2, fromRing = "middle", toRing = "middle", delay = 0) {
      arrows.drawArrow(from, to, color, strokeWidth, fromRing, toRing, delay);
    }
    function getCellCentroid(unitId, ringType = "middle") {
      return arrows.getCellCentroid(unitId, ringType);
    }
    function drawAllArrows() {
      clearArrows();
      const connections = parseArrowConnections(arrowConnections, dialecticalData);
      arrows.drawLabelLinks(connections);
    }
    function drawFlow() {
      //clearArrows();
      const connections = parseArrowConnections(flowConnections, dialecticalData);
      arrows.drawLabelLinks(connections, { klass: "flow-arrows" });
    }

    // Step mode module wiring
    const stepMode = makeStepMode({
      dialecticalData,
      transformToNestedPieData,
      initializeBuildSteps,
      isThesisType,
      getOppositePrefix,
      pie,
      radii: { outerRadius, innerRadius, innerInnerRadius, middleRadius, centerRadius },
      styles,
      groups: { outerGroup, middleLabelsGroup, innerGroup, outerLabelsGroup, middleGroup },
      helpers: { calculateTextTransform, wrapText, getTextConstraints }
    });
    function startStepMode() {
      isStepMode = true;
      stepMode.startStepMode({
        cellVisibility,
        updateAllRings,
        focusPair,
        showCell,
        hideCell,
        clearFocus: () => { focusedPair = null; },
        resetZoom,
        hideCoordinates: () => coordinateGroup.style("display", "none"),
        getCurrentRotationFromDOM,
        setIsStepMode: (v) => { isStepMode = v; },
        getIsStepMode: () => isStepMode,
        nestedData,
        originalNestedData,
        updateAxisPositions,
        rotateToSlice,
        setRotationDirectly,
        cells,
        ...stepMode
      });
    }
    function stepForward() { return stepMode.stepForward({ getIsStepMode: () => isStepMode, updateAllRings, cellVisibility, focusPair, showCell, hideCell, getCurrentRotationFromDOM, groups: { outerGroup, middleLabelsGroup, innerGroup }, helpers: { calculateTextTransform, wrapText, getTextConstraints }, styles }); }
    function stepBackward() { return stepMode.stepBackward({ getIsStepMode: () => isStepMode, updateAllRings, cellVisibility, focusPair, showCell, hideCell, getCurrentRotationFromDOM, groups: { outerGroup, middleLabelsGroup, innerGroup }, helpers: { calculateTextTransform, wrapText, getTextConstraints }, styles }); }
    function resetToFull() { return stepMode.resetToFull({ setIsStepMode: (v)=>{isStepMode=v;}, cellVisibility, clearFocus: () => { focusedPair = null; }, resetZoom, setRotationDirectly, nestedData, originalNestedData, updateAllRings, showCoordinates: () => coordinateGroup.style("display", "block"), updateAxisPositions, rotateToSlice, cells }); }
    function getCurrentStepInfo() { return stepMode.getCurrentStepInfo({ getIsStepMode: () => isStepMode }); }

    // Modified resetToFull that doesn't call updateAxisPositions (for loading animation)
    function resetToFullWithoutAxisUpdate() {
      return stepMode.resetToFull({ 
        setIsStepMode: (v)=>{isStepMode=v;}, 
        cellVisibility, 
        clearFocus: () => { focusedPair = null; }, 
        resetZoom, 
        setRotationDirectly, 
        nestedData, 
        originalNestedData, 
        updateAllRings, 
        showCoordinates: () => coordinateGroup.style("display", "block"), 
        updateAxisPositions: () => {}, // No-op function to prevent axis updates
        rotateToSlice, 
        cells 
      });
    }

    // Loading animation function that returns a promise
    async function initializeWithLoadingAnimation() {
      // First, hide all rings, labels, and axes initially
      invisibleGroup.style("opacity", 0);
      outerGroup.style("opacity", 0);
      middleGroup.style("opacity", 0);
      innerGroup.style("opacity", 0);
      invisibleLabelsGroup.style("opacity", 0);
      outerLabelsGroup.style("opacity", 0);
      middleLabelsGroup.style("opacity", 0);
      innerLabelsGroup.style("opacity", 0);
      centerCircle.style("opacity", 0);
      coordinateGroup.style("opacity", 0); // Hide axes labels
      
      // Initialize the chart data (this will do text wrapping but it's hidden)
      // Use a modified resetToFull that doesn't call updateAxisPositions
      resetToFullWithoutAxisUpdate();
      rotateToSlice(cells[0], undefined, true);
      
      // Animate rings emanating in sequence and wait for completion
      const animationDuration = 300; // ms per ring
      
      // Start with the center hub
      await new Promise(resolve => {
        centerCircle.transition()
          .duration(animationDuration)
          .style("opacity", 1)
          .on("end", resolve);
      });
      
      // Then inner ring (green)
      await new Promise(resolve => {
        innerGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1)
          .on("end", resolve);
        innerLabelsGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1);
      });
      
      // Then middle ring (white)
      await new Promise(resolve => {
        middleGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1)
          .on("end", resolve);
        middleLabelsGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1);
      });
      
      // Then outer ring (red)
      await new Promise(resolve => {
        outerGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1)
          .on("end", resolve);
        outerLabelsGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1);
      });
      
      // Finally invisible ring (last)
      await new Promise(resolve => {
        invisibleGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1)
          .on("end", resolve);
        invisibleLabelsGroup.transition()
          .duration(animationDuration)
          .style("opacity", 1);
      });
      
      // After all rings have finished emanating, show axes and update positions
      coordinateGroup.transition()
        .duration(300)
        .style("opacity", 1);
      updateAxisPositions(cells[0]);
    }

    // Initialize with loading animation
    initializeWithLoadingAnimation();

    // Draw initial arrows
    //drawAllArrows();

    // --- MAKE CHART REACTIVE INITIALLY ---
    updateChartValue();



    // Return the svg node with exposed methods (Observable pattern)
    return Object.assign(svg.node(), {
      focusPair,
      unfocus,
      get focusedPair() { return focusedPair; },
      cells,
      resetZoom,
      rotateToSlice,
      rotate: (angle) => {
        setRotationDirectly(angle);
      },
      // Step animation methods
      startStepMode,
      stepForward,
      stepBackward,
      resetToFull,
      getCurrentStepInfo,
      // Arrow control methods
      drawAllArrows,
      drawFlow,
      clearArrows,
      drawArrow,
      drawLabelLinks: (connections) => arrows.drawLabelLinks(connections),
      getCellCentroid,
      // Invisible ring utilities (for debugging)
      toggleInvisibleRingBorders: () => {
        // Toggle the visibility of invisible ring borders (not text)
        const currentStyle = invisibleGroup.style("opacity");
        const newOpacity = currentStyle === "0.2" ? "0" : "0.2";
        invisibleGroup.style("opacity", newOpacity);
        return newOpacity === "0.2" ? "Invisible ring borders are now visible" : "Invisible ring borders are now hidden";
      }
    });
    })()
);
}
function _stepControls(html,viewof_chart){
return (
(() => {
      const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
        <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 15px; align-items: center;">
          <button id="start" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Start Step Mode</button>
          <button id="prev" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; display: none;" disabled>Previous</button>
          <span id="counter" style="margin: 0 10px; font-weight: bold;">Step 0 of 24</span>
          <button id="next" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;" disabled>Next</button>
          <button id="reset" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer;">Show All</button>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <label for="rotation-slider" style="font-weight: bold;">Rotation:</label>
          <input type="range" id="rotation-slider" min="0" max="360" value="0" step="1" 
                 style="width: 200px; cursor: pointer;" />
          <span id="rotation-value" style="min-width: 40px; font-family: monospace;">0°</span>
          <button id="rotation-reset" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 12px;">Reset</button>
        </div>
      </div>`;

      const startBtn = container.querySelector('#start');
      // const prevBtn = container.querySelector('#prev'); // Hidden - commenting out
      const nextBtn = container.querySelector('#next');
      const resetBtn = container.querySelector('#reset');
      const counter = container.querySelector('#counter');
      const rotationSlider = container.querySelector('#rotation-slider');
      const rotationValue = container.querySelector('#rotation-value');
      const rotationResetBtn = container.querySelector('#rotation-reset');

      function updateUI() {
        const stepInfo = viewof_chart.getCurrentStepInfo();

        if (stepInfo) {
          // In step mode
          counter.textContent = `Step ${stepInfo.current} of ${stepInfo.total} (${stepInfo.unit} ${stepInfo.stepType})`;
          // prevBtn.disabled = !stepInfo.canStepBackward; // Hidden - commenting out
          nextBtn.disabled = !stepInfo.canStepForward;
          startBtn.disabled = true;
          resetBtn.disabled = false;
        } else {
          // In full mode
          counter.textContent = "Full View";
          // prevBtn.disabled = true; // Hidden - commenting out
          nextBtn.disabled = true;
          startBtn.disabled = false;
          resetBtn.disabled = true;
        }
      }

      startBtn.addEventListener('click', () => {
        viewof_chart.startStepMode();
        updateUI();
      });

      // prevBtn.addEventListener('click', () => {
      //   viewof chart.stepBackward();
      //   updateUI();
      // }); // Hidden - commenting out

      nextBtn.addEventListener('click', () => {
        viewof_chart.stepForward();
        updateUI();
      });

      resetBtn.addEventListener('click', () => {
        viewof_chart.resetToFull();
        updateUI();
      });

      // Rotation slider event listeners
      rotationSlider.addEventListener('input', (e) => {
        const degrees = parseInt(e.target.value);
        const radians = (degrees * Math.PI) / 180;
        viewof_chart.rotate(radians);
        rotationValue.textContent = `${degrees}°`;
      });

      rotationResetBtn.addEventListener('click', () => {
        rotationSlider.value = 0;
        viewof_chart.rotate(0);
        rotationValue.textContent = '0°';
      });

      // Initialize UI
      updateUI();

      // Return the container with a value property for viewof
      container.value = "step-controls";
      return container;
    })()
);
}
function _focusedSlice(chart){
//console.log(`focusedSlice at ntbk level: ${chart.clickedSlice}`); 

      return chart.clickedSlice;
}
function _4(chart){
return (
chart.focusedPair
);
}
function _sliceNumber(Inputs,viewof_chart){
return (
Inputs.range([0,viewof_chart.cells.length-1],{value:0,step:1,label:"slice number"})
);
}
function _5(viewof_chart,sliceNumber){
return (
viewof_chart.focusPair(viewof_chart.cells[sliceNumber])
);
}
function _clickedCellObject(chart){
return (
chart.clickedCell
);
}
function _clickedCellText(chart){
if(chart.clickedCell) return chart.clickedCell.fullText;
      return null;
}
function _topSlice(chart,dialecticalData){
// Get current rotation
        const currentRotation = chart.currentRotation;
        //console.log(`topSlice current rotation at ntbk level: ${currentRotation}`)

        // Calculate which slice is at the top (0 degrees)
        const units = Object.keys(dialecticalData);
        const numSlices = units.length;
        const angleStep = (2 * Math.PI) / numSlices;

        // The top position is at 0 degrees (top of wheel)
        // We need to find which slice contains this angle
        const topAngle = 0; // 0 degrees
        const adjustedAngle = topAngle - currentRotation;

        // Normalize angle to [0, 2π]
        let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Find which slice this angle falls into
        const sliceIndex = Math.floor(normalizedAngle / angleStep);
        const topUnitId = units[sliceIndex];
        return topUnitId
}
function _topSliceTracker(html,chart,dialecticalData){
return (
(() => {
      const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
        <div style="margin-bottom: 10px; font-weight: bold;">Top Slice Tracker</div>

        <div id="top-slice-info" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #f9f9f9; min-width: 300px; max-width: 500px;">
          <div id="top-slice-status" style="font-weight: bold; color: #666; margin-bottom: 10px;">Calculating...</div>
          <div id="top-slice-details" style="font-size: 14px; line-height: 1.4; color: #333;"></div>
        </div>

        <div style="margin-top: 10px; font-size: 12px; color: #666;">
          Shows the slice currently at the top (0°) position
        </div>
      </div>`;

      const topSliceStatus = container.querySelector('#top-slice-status');
      const topSliceDetails = container.querySelector('#top-slice-details');

      function updateTopSliceDisplay() {
        // Get current rotation
        const currentRotation = chart.currentRotation;

        // Calculate which slice is at the top (0 degrees)
        const units = Object.keys(dialecticalData);
        const numSlices = units.length;
        const angleStep = (2 * Math.PI) / numSlices;

        // The top position is at 0 degrees (top of wheel)
        // We need to find which slice contains this angle
        const topAngle = 0; // 0 degrees
        const adjustedAngle = topAngle - currentRotation;

        // Normalize angle to [0, 2π]
        let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Find which slice this angle falls into
        const sliceIndex = Math.floor(normalizedAngle / angleStep);
        const topUnitId = units[sliceIndex];

        if (topUnitId) {
          topSliceStatus.textContent = `Top Slice: ${topUnitId}`;
          topSliceStatus.style.color = '#007bff';

          // Get the data for this unit
          const unitData = dialecticalData[topUnitId];

          if (unitData) {
            const details = `
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${topUnitId}:</div>
                <div style="margin-left: 10px; margin-bottom: 8px;">
                  <strong>Statement:</strong> ${unitData.statement}
                </div>
                <div style="margin-left: 10px; margin-bottom: 8px;">
                  <strong>Positive:</strong> ${unitData.positive}
                </div>
                <div style="margin-left: 10px;">
                  <strong>Negative:</strong> ${unitData.negative}
                </div>
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 10px;">
                Rotation: ${(currentRotation * 180 / Math.PI).toFixed(1)}°
              </div>
            `;
            topSliceDetails.innerHTML = details;
          } else {
            topSliceDetails.innerHTML = '<em>Data not available</em>';
          }
        } else {
          topSliceStatus.textContent = 'No slice at top';
          topSliceStatus.style.color = '#666';
          topSliceDetails.innerHTML = '<em>Could not determine top slice</em>';
        }
      }

      // Set up a simple polling mechanism to check rotation
      function startTracking() {
        // Update immediately
        updateTopSliceDisplay();

        // Update every 100ms to catch rotation changes
        setInterval(updateTopSliceDisplay, 100);
      }

      // Start tracking when the cell is created
      startTracking();

      // Return the container with exposed topUnitId
      container.value = "top-slice-tracker";
      container.topUnitId = null; // Will be updated by the tracking function

      // Update the tracking function to also update the exposed value
      const originalUpdateTopSliceDisplay = updateTopSliceDisplay;
      updateTopSliceDisplay = function() {
        originalUpdateTopSliceDisplay();
        // Also update the exposed topUnitId
        const currentRotation = chart.currentRotation;
        const units = Object.keys(dialecticalData);
        const numSlices = units.length;
        const angleStep = (2 * Math.PI) / numSlices;
        const topAngle = 0;
        const adjustedAngle = topAngle - currentRotation;
        let normalizedAngle = ((adjustedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const sliceIndex = Math.floor(normalizedAngle / angleStep);
        container.topUnitId = units[sliceIndex] || null;
      };

      return container;
    })()
);
}
function _parseArrowConnections(){
return (
(dotScript, dialecticalData) => {
      const connections = [];
      const lines = dotScript.split('\n');

      for (let line of lines) {
        // Remove comments and trim
        line = line.split('//')[0].trim();
        if (!line) continue;

        // Parse "A -> B" syntax, now supporting +, -, and i suffixes
        const match = line.match(/(\w+[+-i]?)\s*->\s*(\w+[+-i]?)/);
        if (match) {
          const [, from, to] = match;

          // Extract unit ID and ring type
          const parseUnit = (unit) => {
            if (unit.endsWith('+')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'inner' } : null;
            } else if (unit.endsWith('-')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'outer' } : null;
            } else if (unit.endsWith('i')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
            } else {
              return dialecticalData[unit] ? { unitId: unit, ringType: 'middle' } : null;
            }
          };

          const fromParsed = parseUnit(from);
          const toParsed = parseUnit(to);

          if (fromParsed && toParsed) {
            connections.push({ 
              from: fromParsed.unitId, 
              to: toParsed.unitId,
              fromRing: fromParsed.ringType,
              toRing: toParsed.ringType
            });
          }
        }
      }

      return connections;
    }
);
}
function _dotScriptEditor(html,dialecticalData,arrowConnections,viewof_chart,parseArrowConnections){
return (
(() => {
      const container = html`<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
        <div style="margin-bottom: 10px; font-weight: bold;">DOT Script Editor</div>

        <!-- DOT Script Editor -->
        <div style="margin-bottom: 10px;">
          <label for="connections-editor" style="font-weight: bold;">Edit Connections (DOT syntax):</label>
        </div>
        <textarea id="connections-editor" style="width: 400px; height: 150px; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;"></textarea>
        <div style="margin-top: 10px;">
          <button id="update-connections" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #007bff; color: white; cursor: pointer;">Update Arrows</button>
        </div>
        <div style="margin-top: 15px; font-size: 12px; color: #666; max-width: 400px;">
          <strong>Syntax:</strong> Use "A -> B" format. Available units: ${Object.keys(dialecticalData).join(', ')}<br/>
          <strong>Ring-specific:</strong> Add + for positives (e.g., T1+) or - for negatives (e.g., T1-)<br/>
          <strong>Colors:</strong> 🔴Red for oppositions, 🔵Blue for same type, 🟢Green for same polarity, 🟣Purple for mixed
        </div>
      </div>`;

      const editor = container.querySelector('#connections-editor');
      const updateBtn = container.querySelector('#update-connections');

      // Initialize editor with current connections
      editor.value = arrowConnections;

      // Function to draw arrows from custom connections
      function drawCustomArrows(customConnections) {
        viewof_chart.clearArrows();
        const connections = parseArrowConnections(customConnections, dialecticalData);
        // Use the label-node renderer for consistency with main view
        viewof_chart.drawLabelLinks(connections);
      }

      updateBtn.addEventListener('click', () => {
        console.log('Update button clicked');
        console.log('Editor value:', editor.value);
        console.log('Editor value length:', editor.value.length);

        // Parse and draw the custom connections
        drawCustomArrows(editor.value);
        console.log('Custom arrows drawn');
      });

      // Return the container
      container.value = "dot-script-editor";
      return container;
    })()
);
}
function _arrowConnections(dialecticalData){
return (
(() => {
      const units = Object.keys(dialecticalData);
      let connections = [];

      // Create sequential chain: first -> second -> third -> fourth, etc.
      for (let i = 0; i < units.length; i++) {
        const current = units[i];
        const next = units[(i + 1) % units.length]; // Wrap around to first after last
        connections.push(`${current} -> ${next}  // Sequential flow`);
      }

      // Add some ring-specific connections for visual interest
      for (let i = 0; i < Math.min(units.length, 4); i++) {
        const current = units[i];
        const next = units[(i + 1) % units.length];
        if(current.value == 0 || next.value == 0) continue;
        connections.push(`${current}+ -> ${next}+  // Positive chain`);
        connections.push(`${current}- -> ${next}-  // Negative chain`);
      }



      return connections.join('\n');
    })()
);
}
function _flowConnections(dialecticalData){
return (
(() => {
      const units = Object.keys(dialecticalData);
      let connections = [];

      // Add invisible ring connections
      for (let i = 0; i < units.length; i++) {
        const current = units[i];
        const target = units[(i + 1) % units.length]; // Skip one for variety
        connections.push(`${current}i -> ${target}i  // Flow sequence`);
      }

      return connections.join('\n');
    })()
);
}
function _contraConnections(dialecticalData){
return (
(() => {
      const units = Object.keys(dialecticalData);
      let connections = [];

      // Add invisible ring connections
      for (let i = 0; i*2 < units.length; i++) {
        const current = units[i];
        const target = dialecticalData[units[i]].pairWith;
        connections.push(`${current} -> ${target}  // Contra sequence`);
      }

      return connections.join('\n');
    })()
);
}
function _parseArrowConnectionsAsSourceTarget(){
return (
(dotScript, dialecticalData) => {
      const connections = [];
      const lines = dotScript.split('\n');

      for (let line of lines) {
        // Remove comments and trim
        line = line.split('//')[0].trim();
        if (!line) continue;

        // Parse "A -> B" syntax, now supporting +, -, and i suffixes
        const match = line.match(/(\w+[+-i]?)\s*->\s*(\w+[+-i]?)/);
        if (match) {
          const [, from, to] = match;

          // Extract unit ID and ring type
          const parseUnit = (unit) => {
            if (unit.endsWith('+')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'positive' } : null;
            } else if (unit.endsWith('-')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'negative' } : null;
            } else if (unit.endsWith('i')) {
              const unitId = unit.slice(0, -1);
              return dialecticalData[unitId] ? { unitId, ringType: 'invisible' } : null;
            } else {
              return dialecticalData[unit] ? { unitId: unit, ringType: 'statement' } : null;
            }
          };

          const fromParsed = parseUnit(from);
          const toParsed = parseUnit(to);

          if (fromParsed && toParsed) {
            // Determine connection type based on the relationship
            let type = 'flow';

            // Same unit connections (statement to its positive/negative)
            if (fromParsed.unitId === toParsed.unitId) {
              if (fromParsed.ringType === 'statement' && toParsed.ringType === 'positive') {
                type = 'support';
              } else if (fromParsed.ringType === 'statement' && toParsed.ringType === 'negative') {
                type = 'opposition';
              } else if (fromParsed.ringType === 'positive' && toParsed.ringType === 'negative') {
                type = 'tension';
              }
            }
            // Different unit connections
            else {
              const fromIsThesis = fromParsed.unitId.startsWith('T');
              const toIsThesis = toParsed.unitId.startsWith('T');

              // Same ring type connections
              if (fromParsed.ringType === toParsed.ringType) {
                if (fromParsed.ringType === 'statement') {
                  type = fromIsThesis === toIsThesis ? 'parallel' : 'dialectical';
                } else if (fromParsed.ringType === 'positive') {
                  type = 'reinforcement';
                } else if (fromParsed.ringType === 'negative') {
                  type = 'amplification';
                } else if (fromParsed.ringType === 'invisible') {
                  type = 'structural';
                }
              }
              // Cross-ring connections
              else {
                if ((fromParsed.ringType === 'positive' && toParsed.ringType === 'negative') ||
                    (fromParsed.ringType === 'negative' && toParsed.ringType === 'positive')) {
                  type = 'contradiction';
                } else if (fromParsed.ringType === 'invisible' || toParsed.ringType === 'invisible') {
                  type = 'hidden';
                } else {
                  type = 'synthesis';
                }
              }
            }

            connections.push({ 
              source: `${fromParsed.unitId}: ${dialecticalData[fromParsed.unitId].statement}`, 
              target: `${toParsed.unitId}: ${dialecticalData[toParsed.unitId].statement}`,
              type: type
            });
          }
        }
      }

      return connections;
    }
);
}
function _6(){
return (
null
);
}
function _transformToNestedPieData(isWhiteOutside,whitesOnly,TsOnly){
return (
(dialecticalData, whiteOutside= isWhiteOutside, whiteOnly= whitesOnly, tOnly = TsOnly) => {
          const units = Object.keys(dialecticalData);
          const [outerKey, middleKey] = whiteOutside ? ['middle', 'outer'] : ['outer', 'middle'];

          // Filter units based on tOnly condition
          const filteredUnits = tOnly ? units.filter(unit => unit.charAt(0) === 'T') : units;

          return {
            invisible: filteredUnits.map((unit,index)=> ({
              name: `${unit}i`,
              unitId: unit,
              value: (unit.charAt(0) == 'A' && tOnly) ? 0: 1,
              opacity: (unit.charAt(0) == 'A' && tOnly) ? 0: 1,
              fullText: `${unit}`,
              pairWith: dialecticalData[unit].pairWith,
              pairId: dialecticalData[unit].pairId
            })),
            [outerKey]: filteredUnits.map(unit => ({
              name: `${unit}-`,
              unitId: unit,
              value: whiteOnly ? 0: 1,
              opacity: whiteOnly ? 0: 1,
              fullText: dialecticalData[unit].negative,
              pairWith: dialecticalData[unit].pairWith,
              pairId: dialecticalData[unit].pairId
            })),
            [middleKey]: filteredUnits.map(unit => ({
              name: unit,
              unitId: unit,
              value: 1,
              opacity: 1,
              fullText: dialecticalData[unit].statement,
              pairWith: dialecticalData[unit].pairWith,
              pairId: dialecticalData[unit].pairId
            })),
            inner: filteredUnits.map(unit => ({
              name: `${unit}+`,
              unitId: unit,
              value: whiteOnly ? 0: 1,
              opacity: whiteOnly ? 0: 1,
              fullText: dialecticalData[unit].positive,
              pairWith: dialecticalData[unit].pairWith,
              pairId: dialecticalData[unit].pairId
            }))
          }

        }
);
}
function _wrapText(styles,tryWrapWithLineBreaks,truncateWithEllipses){
return (
(textElement, text, constraints) => {
      const { midWidth, maxHeight, ringType, arcData } = constraints;
      // New: also get angle, innerRadius, outerRadius
      const angle = arcData.endAngle - arcData.startAngle;
      let innerRadius, outerRadius;
      if (ringType === "outer") {
        innerRadius = styles.radii.middleOuter;
        outerRadius = styles.radii.outer;
      } else if (ringType === "middle") {
        innerRadius = styles.radii.middleInner;
        outerRadius = styles.radii.middleOuter;
      } else {
        innerRadius = styles.radii.hub;
        outerRadius = styles.radii.middleInner;
      }

      // Clear any existing content
      textElement.selectAll("tspan").remove();
      textElement.text("");

      // Step 1: Try natural line breaks with original font size
      let result = tryWrapWithLineBreaks(
        textElement, text, maxHeight, angle, innerRadius, outerRadius
      );
      if (result.success) {
        return result;
      }

      // Step 2: Try font resizing (reduce font size progressively)
      const originalFontSize = parseFloat(textElement.style("font-size"));
      const minFontSize = Math.max(4, originalFontSize * 0.5); // Don't go below 4px or 50% of original
      for (let fontSize = originalFontSize * 0.9; fontSize >= minFontSize; fontSize -= 0.5) {
        textElement.style("font-size", fontSize + "px");
        textElement.selectAll("tspan").remove();
        textElement.text("");
        result = tryWrapWithLineBreaks(
          textElement, text, maxHeight, angle, innerRadius, outerRadius
        );
        if (result.success) {
          return result;
        }
      }

      // Step 3: Truncate with ellipses at minimum font size (fallback: use outermost arc length)
      textElement.style("font-size", minFontSize + "px");
      textElement.selectAll("tspan").remove();
      textElement.text("");
      const maxWidth = angle * ((innerRadius + outerRadius) / 2) * 0.85;
      return truncateWithEllipses(textElement, text, maxWidth, maxHeight, false);
    }
);
}
function _tryWrapWithLineBreaks(){
return (
(textElement, text, maxHeight, angle, innerRadius, outerRadius) => {
      const fontSize = parseFloat(textElement.style("font-size"));
      const lineHeight = fontSize * 1.2;
      const maxLines = Math.floor(maxHeight / lineHeight);
      if (maxLines < 1) {
        return { success: false };
      }

      // Create a temporary tspan to measure text
      const tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);

      // Calculate margin proportional to inner/outer radius
      const margin = 0.8;

      // Convert text to word queue
      const wordQueue = text.split(/([ -])/);
      const lines = [];
      let lineIdx = 0;

      // Helper function to get chord length for a given line index
      const getChordLength = (lineIndex) => {
        let radius = outerRadius - (lineIndex + 0.5) * lineHeight;
        if (radius < innerRadius) radius = innerRadius;
        const bestAngle = Math.acos(radius / outerRadius);
        return 2 * radius * Math.sin(Math.min(bestAngle, angle/2)) * margin;
      };

      // Helper function to measure a line
      const measureLine = (words) => {
        tempTspan.text(words.join(""));
        return tempTspan.node().getComputedTextLength();
      };

      let i = 0;
      while (i < wordQueue.length && lines.length < maxLines) {
        let lo = 1;
        let hi = wordQueue.length - i;
        let bestFit = 0;
        // Binary search for the max number of words that fit on this line
        while (lo <= hi) {
          let mid = Math.floor((lo + hi) / 2);
          const candidate = wordQueue.slice(i, i + mid);
          const width = measureLine(candidate);
          if (width <= getChordLength(lineIdx)) {
            bestFit = mid;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }
        if (bestFit === 0) {
          // Single word doesn't fit on the line
          tempTspan.remove();
          return { success: false };
        }
        lines.push(wordQueue.slice(i, i + bestFit).join(""));
        i += bestFit;
        lineIdx++;
      }

      // Add the last line if there are remaining words (shouldn't happen with this logic, but for safety)
      if (i < wordQueue.length && lines.length < maxLines) {
        lines.push(wordQueue.slice(i).join(""));
        i = wordQueue.length;
      }

      // If we still have words left, fail
      if (i < wordQueue.length) {
        tempTspan.remove();
        return { success: false };
      }

      tempTspan.remove();

      // Calculate total text height for centering
      const totalHeight = lines.length * lineHeight;
      const offsetY = -(totalHeight - lineHeight) / 2; // Center the text block

      // Create the actual tspans with proper centering and per-line width
      lines.forEach((line, index) => {
        let radius = outerRadius - (index + 0.5) * lineHeight;
        if (radius < innerRadius) radius = innerRadius;
        const chordLen = getChordLength(index);
        const tspan = textElement.append("tspan")
          .attr("x", 0)
          .attr("dy", index === 0 ? offsetY : lineHeight)
          .text(line);
        // Optionally, set a data attribute for debugging: tspan.attr("data-chordwidth", chordLen);
      });

      return { success: true, lines: lines.length, fontSize: fontSize, totalHeight: totalHeight };
    }
);
}
function _truncateWithEllipses(){
return (
(textElement, text, maxWidth, maxHeight, isNarrowCell) => {
      const fontSize = parseFloat(textElement.style("font-size"));
      const lineHeight = fontSize * 1.2;
      const maxLines = Math.floor(maxHeight / lineHeight);

      if (maxLines < 1) {
        // If we can't fit even one line, just show the first few characters
        const tspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);
        let truncated = "";
        for (let i = 0; i < text.length; i++) {
          const testText = text.substring(0, i + 1) + "...";
          tspan.text(testText);
          if (tspan.node().getComputedTextLength() > maxWidth) {
            break;
          }
          truncated = testText;
        }
        tspan.text(truncated || "...");
        return { success: true, truncated: true, totalHeight: fontSize * 1.2 };
      }

      const words = text.split(/\s+/);
      let lines = [];
      let currentLine = [];

      const tempTspan = textElement.append("tspan").attr("x", 0).attr("dy", 0);

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = [...currentLine, word];
        const isLastPossibleLine = lines.length === maxLines - 1;
        const testText = isLastPossibleLine ? testLine.join(" ") + "..." : testLine.join(" ");

        tempTspan.text(testText);

        if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 0) {
          // Current line is full
          if (lines.length >= maxLines - 1) {
            // This is the last line we can fit, add ellipses
            const finalLine = currentLine.join(" ") + "...";
            tempTspan.text(finalLine);
            if (tempTspan.node().getComputedTextLength() > maxWidth && currentLine.length > 1) {
              // Even with ellipses it's too long, remove words until it fits
              while (currentLine.length > 1) {
                currentLine.pop();
                const shorterLine = currentLine.join(" ") + "...";
                tempTspan.text(shorterLine);
                if (tempTspan.node().getComputedTextLength() <= maxWidth) {
                  break;
                }
              }
            }
            lines.push(currentLine.join(" ") + "...");
            break;
          } else {
            lines.push(currentLine.join(" "));
            currentLine = [word];
          }
        } else {
          currentLine.push(word);
        }
      }

      // Add the last line if we haven't hit the limit and there are remaining words
      if (lines.length < maxLines && currentLine.length > 0) {
        lines.push(currentLine.join(" "));
      }

      tempTspan.remove();

      // Calculate total text height for centering
      const totalHeight = lines.length * lineHeight;
      const offsetY = -(totalHeight - lineHeight) / 2; // Center the text block

      // Create the actual tspans with proper centering
      lines.forEach((line, index) => {
        textElement.append("tspan")
          .attr("x", 0)
          .attr("dy", index === 0 ? offsetY : lineHeight)
          .text(line);
      });

      return { success: true, lines: lines.length, truncated: lines.some(line => line.includes("...")), totalHeight: totalHeight };
    }
);
}
function _getTextConstraints(styles){
return (
(ringType, arcData) => {
      const angle = arcData.endAngle - arcData.startAngle;

      // Calculate actual ring dimensions
      let innerRadius, outerRadius;
      if (ringType === "invisible") {
        innerRadius = styles.radii.outer; 
        outerRadius = styles.radii.invisible;
      } else if (ringType === "outer") {
        innerRadius = styles.radii.middleOuter; // innerRadius
        outerRadius = styles.radii.outer; // outerRadius
      } else if (ringType === "middle") {
        innerRadius = styles.radii.middleInner; // innerInnerRadius  
        outerRadius = styles.radii.middleOuter; // middleRadius
      } else { // inner
        innerRadius = styles.radii.hub;  // inner hole radius
        outerRadius = styles.radii.middleInner; // centerRadius
      }

      // Calculate available radial space (height)
      const radialSpace = outerRadius - innerRadius;
      const maxHeight = radialSpace * 0.8; // Use 80% of radial space for safety margin

      // Calculate available angular space (width) at the middle radius
      const middleRadius = (innerRadius + outerRadius) / 2;
      const arcLength = middleRadius * angle;
      const maxWidth = arcLength * 0.85; // Use 85% of arc length for safety margin

      // Ensure minimum readable dimensions
      const minWidth = 30;
      const minHeight = 20;

      return {
        maxWidth: Math.max(maxWidth, minWidth),
        maxHeight: Math.max(maxHeight, minHeight),
        ringType: ringType,
        arcData: arcData,
        // Additional info for debugging
        cellAngle: angle,
        cellAngleDegrees: (angle * 180) / Math.PI,
        radialSpace: radialSpace,
        arcLength: arcLength
      };
    }
);
}
function _arrowUtilities(isThesisType){
return (
(() => {
      // Quadratic curve point calculation
      function getPointAlongQuadraticCurve(start, control, end, t) {
        const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control.x + Math.pow(t, 2) * end.x;
        const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control.y + Math.pow(t, 2) * end.y;
        return { x, y };
      }

      // Create arrowhead marker for a specific color
      function createArrowheadMarker(defs, color, id) {
        defs.append("marker")
          .attr("id", id)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 6)
          .attr("refY", 0)
          .attr("markerWidth", 3.5)
          .attr("markerHeight", 3.5)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M0,-5L10,0L0,5")
          .attr("fill", color);
      }

      // Get the appropriate arrowhead marker ID for a color
      function getArrowheadId(color) {
        switch(color) {
          case "#16a34a": return "arrowhead-green";
          case "#dc2626": return "arrowhead-red";
          case "#8b5cf6": return "arrowhead-purple";
          case "#2563eb": return "arrowhead-blue";
          case "#ff9500": return "arrowhead-orange";
          default: return "arrowhead-gray";
        }
      }

      // Calculate arrow color based on connection type
      function calculateArrowColor(fromRing, toRing, fromUnitId, toUnitId) {
        let color = "#666"; // Default gray

        // Check if it's a ring-specific connection
        if (fromRing !== 'middle' || toRing !== 'middle') {
          // Ring-specific connections get special colors
          if ((fromRing === 'inner' && toRing === 'inner') || 
              (fromRing === 'outer' && toRing === 'outer') ||
              (fromRing === 'invisible' && toRing === 'invisible')) {
            color = "#16a34a"; // Green for same polarity (+ to + or - to - or i to i)
          } else if ((fromRing === 'inner' && toRing === 'outer') || 
                     (fromRing === 'outer' && toRing === 'inner')) {
            color = "#dc2626"; // Red for opposite polarity (+ to - or - to +)
          } else if (fromRing === 'invisible' || toRing === 'invisible') {
            color = "#ff9500"; // Orange for invisible ring connections
          } else {
            color = "#8b5cf6"; // Purple for mixed connections (statement to +/-)
          }
        } else {
          // Statement-level connections
              const fromIsThesis = isThesisType(fromUnitId);
        const toIsThesis = isThesisType(toUnitId);
          if (fromIsThesis === toIsThesis) {
            color = "#2563eb"; // Blue for same type (thesis-thesis or antithesis-antithesis)
          } else {
            color = "#dc2626"; // Red for opposition (thesis-antithesis)
          }
        }

        return color;
      }

      // Calculate shortened arrow positions to avoid overlap with cells
      function calculateArrowPath(fromPos, toPos, shortenBy = 10, curvature = null) {
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        // Compute effective circular radii for source/target cells based on their annular sector geometry
        function computeEffectiveRadius(pos) {
          // Prefer exact label rectangle when available
          if (pos && pos.labelWidth != null && pos.labelHeight != null && pos.labelRotationRadians != null) {
            // Project segment from center to label rectangle edge in the direction of the link
            // Use the rectangle's half extents in its local coordinates, rotated into world
            // We supply world-space direction later; here, just return diagonal-based radius; edge projection is handled below
            const radiusDiag = Math.sqrt(Math.pow(pos.labelWidth / 2, 2) + Math.pow(pos.labelHeight / 2, 2));
            return Math.max(shortenBy, radiusDiag);
          }
          if (!pos || pos.thickness == null || pos.angleSpan == null || pos.rCentroid == null) {
            if (pos && pos.labelRadius != null) return Math.max(shortenBy, pos.labelRadius);
            return shortenBy;
          }
          const halfRadial = pos.thickness / 2;
          const halfArcLength = (pos.angleSpan * pos.rCentroid) / 2;
          const radius = Math.sqrt(halfRadial * halfRadial + halfArcLength * halfArcLength);
          return Math.max(shortenBy, radius * 0.6);
        }

        let sourceOffset = computeEffectiveRadius(fromPos) + 4;
        let targetOffset = computeEffectiveRadius(toPos) + 4;

        // If offsets are too large for the available distance, scale them down proportionally
        const totalOffset = sourceOffset + targetOffset;
        if (totalOffset > distance - 6) {
          const scale = Math.max(0, (distance - 6) / totalOffset);
          sourceOffset *= scale;
          targetOffset *= scale;
        }

        // Helper: project to label rectangle edge if label geometry exists
        function projectToLabelEdge(pos, dirSign) {
          // dirSign = +1 for source (move forward), -1 for target (move backward)
          if (!(pos && pos.labelWidth != null && pos.labelHeight != null && pos.labelRotationRadians != null)) {
            return {
              x: pos.x + (dx / distance) * (dirSign * (dirSign > 0 ? sourceOffset : -targetOffset)),
              y: pos.y + (dy / distance) * (dirSign * (dirSign > 0 ? sourceOffset : -targetOffset))
            };
          }
          const ux = dx / distance;
          const uy = dy / distance;
          const dirx = dirSign > 0 ? ux : -ux;
          const diry = dirSign > 0 ? uy : -uy;

          // Rotate direction into label's local space
          const cosA = Math.cos(pos.labelRotationRadians);
          const sinA = Math.sin(pos.labelRotationRadians);
          const localDx = dirx * cosA + diry * sinA;
          const localDy = -dirx * sinA + diry * cosA;

          const hx = pos.labelWidth / 2;
          const hy = pos.labelHeight / 2;

          // Distances to each side along the ray in local coords
          const tx = localDx !== 0 ? hx / Math.abs(localDx) : Infinity;
          const ty = localDy !== 0 ? hy / Math.abs(localDy) : Infinity;
          const tEdge = Math.min(tx, ty);

          // Edge point in local coords
          const exLocal = localDx * tEdge;
          const eyLocal = localDy * tEdge;

          // Rotate back to world
          const exWorld = exLocal * cosA - eyLocal * sinA;
          const eyWorld = exLocal * sinA + eyLocal * cosA;

          return { x: pos.x + exWorld, y: pos.y + eyWorld };
        }

        // Shorten the arrow to start/end exactly at label rectangle edges when possible
        const fromShortened = projectToLabelEdge(fromPos, +1);
        const toShortened = projectToLabelEdge(toPos, -1);

        // Create curved path for better visibility (dampen curvature for short links)
        const midX = (fromShortened.x + toShortened.x) / 2;
        const midY = (fromShortened.y + toShortened.y) / 2;

        // Recompute based on shortened endpoints
        const dx2 = toShortened.x - fromShortened.x;
        const dy2 = toShortened.y - fromShortened.y;
        const remainingDistance = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;

        // Perpendicular of the shortened segment
        const perpX = -dy2 / remainingDistance;
        const perpY = dx2 / remainingDistance;

        // Simplified curvature: linear with distance, clamped by a cap.
        // If a curvature override is passed, use it directly.
        const CURVE_FACTOR = 0.3;
        const CURVE_CAP = 120;
        const effectiveCurvature = (curvature != null)
          ? curvature
          : Math.min(remainingDistance * CURVE_FACTOR, CURVE_CAP);

        const controlX = midX - perpX * effectiveCurvature;
        const controlY = midY - perpY * effectiveCurvature;

        return {
          path: `M ${fromShortened.x} ${fromShortened.y} Q ${controlX} ${controlY} ${toShortened.x} ${toShortened.y}`,
          start: fromShortened,
          control: { x: controlX, y: controlY },
          end: toShortened
        };
      }

      return {
        getPointAlongQuadraticCurve,
        createArrowheadMarker,
        getArrowheadId,
        calculateArrowColor,
        calculateArrowPath
      };
    })()
);
}
function _getPointAlongQuadraticCurve(arrowUtilities){
return (
arrowUtilities.getPointAlongQuadraticCurve
);
}
function _initializeBuildSteps(getOppositePrefix,isThesisType){
return (
(dialecticalData) => {
      const buildSteps = [];

      // Dynamically generate build sequence based on dialecticalData
      const units = Object.keys(dialecticalData);

      // Create pairs by iterating through first half of units and finding their opposites
      const buildSequence = [];
      const processedUnits = new Set();

      units.forEach(unitId => {
        // Skip if we've already processed this unit as part of a pair
        if (processedUnits.has(unitId)) return;

        // Find the opposite unit
        const oppositeUnitId = getOppositePrefix(unitId);

        // Only proceed if the opposite exists in our data
        if (units.includes(oppositeUnitId)) {
          // Determine which is thesis/antithesis for consistent ordering
          const isThesis = isThesisType(unitId);
          const thesis = isThesis ? unitId : oppositeUnitId;
          const antithesis = isThesis ? oppositeUnitId : unitId;

          buildSequence.push([thesis, antithesis]);

          // Mark both units as processed
          processedUnits.add(unitId);
          processedUnits.add(oppositeUnitId);
        }
      });

      buildSequence.forEach(([thesis, antithesis]) => {
        // Show thesis (T)
        buildSteps.push({
          type: 'showWhite',
          unitId: thesis,
          description: `Show ${thesis} (${dialecticalData[thesis].statement.substring(0, 30)}...)`
        });
        buildSteps.push({
          type: 'showGreen',
          unitId: thesis,
          description: `Show ${thesis} + (${dialecticalData[thesis].positive.substring(0, 30)}...)`
        });
        buildSteps.push({
          type: 'showRed',
          unitId: thesis,
          description: `Show ${thesis} - (${dialecticalData[thesis].negative.substring(0, 30)}...)`
        });

        // Show antithesis (A)
        buildSteps.push({
          type: 'showWhite',
          unitId: antithesis,
          description: `Show ${antithesis} (${dialecticalData[antithesis].statement.substring(0, 30)}...)`
        });
        buildSteps.push({
          type: 'showGreen',
          unitId: antithesis,
          description: `Show ${antithesis} + (${dialecticalData[antithesis].positive.substring(0, 30)}...)`
        });
        buildSteps.push({
          type: 'showRed',
          unitId: antithesis,
          description: `Show ${antithesis} - (${dialecticalData[antithesis].negative.substring(0, 30)}...)`
        });
      });

      return buildSteps;
    }
);
}
function _longPressUtilities(d3){
return (
(() => {
      // Long press configuration
      const LONG_PRESS_DURATION = 500; // 500ms for long press
      const LONG_PRESS_MOVE_THRESHOLD = 10; // pixels - cancel if finger moves more than this

      // Helper function to detect if device supports touch
      function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      }

      // Create a long press handler factory
      function createLongPressHandler(zoomToCell) {
        // Long press state variables
        let longPressTimer = null;
        let longPressTarget = null;
        let longPressData = null;
        let longPressStartPos = null;
        let isLongPressing = false;

        // Start long press detection
        function startLongPress(element, event, data) {
          // Only on touch devices - reference the outer function
          if (!isTouchDevice()) {
            console.log('startLongPress called but not a touch device');
            return;
          }

          console.log('Starting long press timer for:', data.data.unitId);

          // Clear any existing timer
          clearLongPress();

          longPressTarget = element;
          longPressData = data;
          isLongPressing = false;

          // Store initial touch position for movement tracking
          if (event.touches && event.touches.length > 0) {
            longPressStartPos = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY
            };
          }

          // Add visual feedback - subtle highlight
          d3.select(element)
            .style("stroke", "#ff6b35")
            .style("stroke-width", "3px")
            .style("opacity", "0.8");

          // Set timer for long press
          longPressTimer = setTimeout(() => {
            if (longPressTarget && longPressData) {
              console.log('Long press triggered for:', longPressData.data.unitId);
              isLongPressing = true;

              // Stronger visual feedback for successful long press
              d3.select(longPressTarget)
                .style("stroke", "#ff3300")
                .style("stroke-width", "4px")
                .transition()
                .duration(150)
                .style("transform", "scale(1.05)")
                .on("end", function() {
                  // Trigger zoom after visual feedback
                  const mockEvent = {
                    stopPropagation: () => {},
                    metaKey: true, // Simulate cmd+click for zoom
                    currentTarget: longPressTarget
                  };
                  zoomToCell(mockEvent, longPressData);

                  // Reset visual state
                  d3.select(longPressTarget)
                    .style("transform", null)
                    .style("stroke", null)
                    .style("stroke-width", null)
                    .style("opacity", null);
                });
            }
          }, LONG_PRESS_DURATION);
        }

        // Clear long press detection
        function clearLongPress() {
          if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
          }

          if (longPressTarget && !isLongPressing) {
            // Reset visual feedback if long press was cancelled
            d3.select(longPressTarget)
              .style("stroke", null)
              .style("stroke-width", null)
              .style("opacity", null);
          }

          longPressTarget = null;
          longPressData = null;
          longPressStartPos = null;
          isLongPressing = false;
        }

        // Check if touch movement should cancel long press
        function checkTouchMovement(event) {
          if (longPressStartPos && event.touches && event.touches.length > 0) {
            const currentPos = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY
            };
            const distance = Math.sqrt(
              Math.pow(currentPos.x - longPressStartPos.x, 2) + 
              Math.pow(currentPos.y - longPressStartPos.y, 2)
            );

            // Return true if movement exceeds threshold (should cancel)
            return distance > LONG_PRESS_MOVE_THRESHOLD;
          }
          return true; // Cancel if no proper touch data
        }

        return {
          startLongPress,
          clearLongPress,
          checkTouchMovement,
          isTouchDevice,
          get isLongPressing() { return isLongPressing; },
          set isLongPressing(value) { isLongPressing = value; }
        };
      }

      return {
        createLongPressHandler,
        isTouchDevice,
        LONG_PRESS_DURATION,
        LONG_PRESS_MOVE_THRESHOLD
      };
    })()
);
}
function _selectedFont(Inputs){
return (
Inputs.select(
      [
        "Source Serif Pro",
        "Source Sans Pro",
        "Alegreya",
        "Inter",
        "Lato",
        "Laila",
        "Merriweather",
        "PT Serif",
        "Roboto Slab",
        "Rubik",
        "Crimson Text",
        "Cascadia Mono",
        "Ubuntu Mono",
        "Arial"
      ],
      {
        label: "Desired font",
        // options:,
        value: "Arial"
      }
    )
);
}
function _parseFont(selectedFont){
return (
selectedFont.split(" ").join("+")
);
}
function _style(html,parseFont,selectedFont){
return (
html`
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${parseFont}:ital@0;1&display=swap">

    <style>
      body, svg {
            font-family: ${selectedFont}, sans-serif;
            /* font-size: 48px; */
     }
    </style>
    `
);
}
function _fontCDN(parseFont){
return (
`https://fonts.googleapis.com/css2?family=${parseFont}:ital@0;1&display=swap`
);
}
function _serialize(NodeFilter){
const xmlns = "http://www.w3.org/2000/xmlns/";
      const xlinkns = "http://www.w3.org/1999/xlink";
      const svgns = "http://www.w3.org/2000/svg";
      return function serialize(svg) {
        svg = svg.cloneNode(true);
        const fragment = window.location.href + "#";
        const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
        while (walker.nextNode()) {
          for (const attr of walker.currentNode.attributes) {
            if (attr.value.includes(fragment)) {
              attr.value = attr.value.replace(fragment, "#");
            }
          }
        }
        svg.setAttributeNS(xmlns, "xmlns", svgns);
        svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
        const serializer = new window.XMLSerializer;
        const string = serializer.serializeToString(svg);
        return new Blob([string], {type: "image/svg+xml"});
      };
}
function _rasterize(DOM,serialize){
return (
function rasterize(svg) {
      let resolve, reject;
      const promise = new Promise((y, n) => (resolve = y, reject = n));
      const image = new Image;
      image.onerror = reject;
      image.onload = () => {
        const rect = svg.getBoundingClientRect();
        const context = DOM.context2d(rect.width, rect.height);
        context.drawImage(image, 0, 0, rect.width, rect.height);
        context.canvas.toBlob(resolve);
      };
      image.src = URL.createObjectURL(serialize(svg));
      return promise;
    }
);
}
function _7(DOM,rasterize,viewof_chart){
return (
DOM.download(() => rasterize(viewof_chart), undefined, "Save as PNG")
);
}
function _fontsize(Inputs){
return (
Inputs.range([8,30],{value:20,step:1,label:"Font Size"})
);
}
function _rotationAngle(Inputs){
return (
Inputs.range([-180,180],{value:0,step:1,label:"Rotation"})
);
}
function _8(rotationAngle){
// effect: apply rotation without restarting simulation
      const apply = () => {
        const root = document.querySelector('svg .graph-rotate');
        if (!root) return;
        root.setAttribute('transform', `rotate(${rotationAngle})`);
        root.querySelectorAll('text').forEach(t => t.setAttribute('transform', `rotate(${-rotationAngle})`));
      };
      apply();
}
function _graph(componentOrder,styles,flowSuits,contraSuits,d3,location,drag,fontsize,selectedFont,invalidation){
// Explicit dependency so the graph re-runs when ordering changes
      const __componentOrderDep = componentOrder;
      const width = styles.width;
      const height = styles.height;
      // Build link datasets from both flow and contra connections
      const flowLinksData = flowSuits.map(d => Object.assign({}, d, { isContra: false }));
      const contraLinksData = contraSuits.map(d => Object.assign({}, d, { isContra: true }));
      const allLinksData = [...flowLinksData, ...contraLinksData];

      const types = Array.from(new Set(allLinksData.map(d => d.type)));
      const nodes = Array.from(new Set(allLinksData.flatMap(l => [l.source, l.target])), id => ({ id }));
      const nodeById = new Map(nodes.map(d => [d.id, d]));

      const color = d3.scaleOrdinal(types, d3.schemeCategory10);

      const simulation = d3.forceSimulation(nodes)
          // Only use the flow links to shape the layout so the initial circle is preserved
          .force("link", d3.forceLink(flowLinksData).id(d => d.id).distance(100))
          .force("charge", d3.forceManyBody().strength(-800))
          .force("x", d3.forceX())
          .force("y", d3.forceY());

      const svg = d3.create("svg")
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

      // Per-type markers
      svg.append("defs").selectAll("marker")
        .data(types)
        .join("marker")
          .attr("id", d => `arrow-${d}`)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 10)
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto-start-reverse")
        .append("path")
          .attr("fill", color)
          .attr("d", "M0,-5L10,0L0,5");

      // Container to rotate the entire graph while keeping text upright
      const g = svg.append("g").attr("class", "graph-rotate").attr("transform", `rotate(0)`);

      // Map link endpoints to node objects for rendering so linkArc can read x/y
      const renderLinksData = allLinksData.map(l => {
        const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
        const targetId = typeof l.target === 'string' ? l.target : l.target.id;
        return {
          ...l,
          source: nodeById.get(sourceId),
          target: nodeById.get(targetId)
        };
      });

      const link = g.append("g")
          .attr("fill", "none")
          .attr("stroke-width", 1.5)
        .selectAll("path")
        // Render all links (flow + contra), but they won't affect the layout
        .data(renderLinksData)
        .join("path")
          .attr("stroke", d => d.isContra ? "#d62728" : color(d.type))
          .attr("stroke-dasharray", d => d.isContra ? "4,2" : null)
          .attr("stroke-width", d => d.isContra ? 2 : 1.5)
          .attr("marker-start", d => d.isContra ? `url(${new URL(`#arrow-${d.type}`, location)})` : null)
          .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

      const node = g.append("g")
          .attr("fill", "currentColor")
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
          .call(drag(simulation));

      // Function to wrap text and return dimensions
      function wrapText(textElement, text, maxWidth = 120) {
        const words = text.split(/\s+/);
        const lineHeight = 1.2; // em

        textElement.selectAll("tspan").remove(); // Clear existing tspans

        // For very small widths, just split by character
        if (maxWidth <= 10) {
          const chars = text.split('');
          textElement.selectAll("tspan")
            .data(chars)
            .join("tspan")
              .attr("x", 0)
              .attr("dy", (d, i) => i === 0 ? `${-((chars.length - 1) * lineHeight * 0.5)}em` : `${lineHeight}em`)
              .attr("text-anchor", "middle")
              .text(d => d);

          const bbox = textElement.node().getBBox();
          return {
            width: bbox.width,
            height: bbox.height,
            lineCount: chars.length
          };
        }

        // Estimate character width (rough approximation: 0.6 * font-size for average character)
        const avgCharWidth = fontsize * 0.6; // 20px font size
        const maxCharsPerLine = Math.max(1, Math.floor(maxWidth / avgCharWidth));

        // If there's a colon, color the prefix (before the colon) differently
        const colonIndex = text.indexOf(":");
        const hasPrefix = colonIndex >= 0;
        const prefixText = hasPrefix ? text.slice(0, colonIndex + 1) : "";
        const bodyText = hasPrefix ? text.slice(colonIndex + 1).trimStart() : text;

        const lines = [];
        let currentLine = "";
        const bodyWords = bodyText.split(/\s+/);

        for (let i = 0; i < bodyWords.length; i++) {
          const word = bodyWords[i];
          const testLine = currentLine + (currentLine ? " " : "") + word;

          // Simple character count based wrapping
          if (testLine.length > maxCharsPerLine && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          lines.push(currentLine);
        }

        // If still no wrapping happened, force it by character count
        if (lines.length === 1 && bodyText.length > maxCharsPerLine) {
          lines.length = 0;
          for (let i = 0; i < bodyText.length; i += maxCharsPerLine) {
            lines.push(bodyText.slice(i, i + maxCharsPerLine));
          }
        }

        const totalLines = Math.max(1, lines.length);

        // Build tspans. If we have a prefix, put it on the first line with a different color.
        if (hasPrefix) {
          // Choose color based on prefix initial
          const initial = prefixText.trim()[0];
          let prefixColor = "#2563eb"; // default blue
          if (initial === 'A') prefixColor = "#dc2626"; // red

          // First line baseline shift
          textElement.append("tspan")
            .attr("x", 0)
            .attr("dy", `${-((totalLines - 1) * lineHeight * 0.5)}em`)
            .attr("text-anchor", "middle")
            .attr("fill", prefixColor)
            .text(prefixText + (lines[0] ? " " : ""));

          if (lines.length > 0) {
            textElement.append("tspan")
              .attr("text-anchor", "middle")
              .text(lines[0]);
          }

          for (let i = 1; i < lines.length; i++) {
            textElement.append("tspan")
              .attr("x", 0)
              .attr("dy", `${lineHeight}em`)
              .attr("text-anchor", "middle")
              .text(lines[i]);
          }
        } else {
          // No prefix; regular multi-line tspans
          textElement.selectAll("tspan")
            .data(lines)
            .join("tspan")
              .attr("x", 0)
              .attr("dy", (d, i) => i === 0 ? `${-((lines.length - 1) * lineHeight * 0.5)}em` : `${lineHeight}em`)
              .attr("text-anchor", "middle")
              .text(d => d);
        }

        // Calculate actual dimensions
        const bbox = textElement.node().getBBox();
        return {
          width: bbox.width,
          height: bbox.height,
          lineCount: totalLines
        };
      }

      // Create text nodes with wrapping
      const text = node.append("text")
          .attr("font-size", `${fontsize}px`)
          .attr("font-family", selectedFont)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("cursor", "grab")
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("stroke-width", 3)
          .attr("paint-order", "stroke")
          .attr("transform", `rotate(0)`);

      // Hover behavior: scale entire node and perturb simulation
      const HOVER_SCALE = 1.5;
      function effectiveRadius(n) { return n.radius * (n.scale || 1); }

      node
        .on("mouseenter", function(event, d) {
          const start = d.scale || 1;
          const end = HOVER_SCALE;
          simulation.force("collide").radius(n => effectiveRadius(n));
          simulation.alphaTarget(0.25).restart();
          d3.select(this)
            .transition()
            .duration(180)
            .ease(d3.easeCubicOut)
            .tween("scale", () => {
              const i = d3.interpolateNumber(start, end);
              return t => { d.scale = i(t); };
            });
        })
        .on("mouseleave", function(event, d) {
          const start = d.scale || 1;
          const end = 1;
          simulation.force("collide").radius(n => effectiveRadius(n));
          d3.select(this)
            .transition()
            .duration(180)
            .ease(d3.easeCubicOut)
            .tween("scale", () => {
              const i = d3.interpolateNumber(start, end);
              return t => { d.scale = i(t); };
            })
            .on("end", () => { if (!event.active) simulation.alphaTarget(0); });
        });

      // Calculate node dimensions after text wrapping
      node.each(function(d) {
        const textElement = d3.select(this.querySelector('text'));
        const textDimensions = wrapText(textElement, d.id, 120); // Back to reasonable width

        const padding = 10; // Reduced padding since we're using actual text bounds

        // Store actual text dimensions for edge calculations
        d.textWidth = textDimensions.width;
        d.textHeight = textDimensions.height;

        // Make collision radius large enough to fully contain the text with padding
        // Use the diagonal of the text bounding box plus padding for circular collision
        d.radius = Math.sqrt((d.textWidth + padding * 2) ** 2 + (d.textHeight + padding * 2) ** 2) / 2;

        // Store rectangular bounds for more precise edge calculations
        d.width = d.textWidth + padding * 2;
        d.height = d.textHeight + padding * 2;
      });

      // Add collision detection after dimensions are calculated
      simulation
        .force("collide", d3.forceCollide()
          .radius(d => effectiveRadius(d))
          .strength(1.0)
          .iterations(3))
        .force("charge", d3.forceManyBody().strength(-2000))
        .alpha(1)
        .restart();

      // Function to calculate link path using circular collision radius
      function linkArc(d) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return "M0,0L0,0";

        // Use collision radius directly for both source and target
        const buffer = 5; // Small buffer so arrows don't touch the collision boundary
        const sourceEdgeDistance = effectiveRadius(d.source)*4 + buffer;
        const targetEdgeDistance = effectiveRadius(d.target)*4 + buffer;

        const startX = d.source.x + (dx / distance) * sourceEdgeDistance;
        const startY = d.source.y + (dy / distance) * sourceEdgeDistance;
        const endX = d.target.x - (dx / distance) * targetEdgeDistance;
        const endY = d.target.y - (dy / distance) * targetEdgeDistance;

        // Create slight curve for better visibility of multiple links
        const dr = distance * 1;

        return `M${startX},${startY}A${dr},${dr} 0 0,1 ${endX},${endY}`;
      }

      simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y}) scale(${d.scale || 1})`);
      });

      invalidation.then(() => simulation.stop());

      return Object.assign(svg.node(), {scales: {color}});
}
function _drag(d3){
return (
simulation => {

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
);
}
function _flowSuits(parseArrowConnectionsAsSourceTarget,flowConnections,dialecticalData){
return (
parseArrowConnectionsAsSourceTarget(flowConnections, dialecticalData)
);
}
function _contraSuits(parseArrowConnectionsAsSourceTarget,contraConnections,dialecticalData){
return (
parseArrowConnectionsAsSourceTarget(contraConnections, dialecticalData)
);
}
function _suits(flowSuits,contraSuits){
return (
[...flowSuits, ...contraSuits]
);
}
function _getOppositePrefix(){
return (
function getOppositePrefix(unitId) {
      if (unitId.startsWith('Ac')) return unitId.replace('Ac', 'Re');
      if (unitId.startsWith('T')) return unitId.replace('T', 'A');
      if (unitId.startsWith('A')) return unitId.replace('A', 'T');
      if (unitId.startsWith('Re')) return unitId.replace('Re', 'Ac');
      return unitId; // fallback for unknown prefixes
    }
);
}
function _getUnitType(){
return (
function getUnitType(unitId) {
      if (unitId.startsWith('T') || unitId.startsWith('Re')) return 'thesis';
      if (unitId.startsWith('A') || unitId.startsWith('Ac')) return 'antithesis';
      return 'unknown'; // fallback for unknown prefixes
    }
);
}
function _isThesisType(){
return (
function isThesisType(unitId) {
      return unitId.startsWith('T') || unitId.startsWith('Re');
    }
);
}
function _isAntithesisType(){
return (
function isAntithesisType(unitId) {
      return unitId.startsWith('A') || unitId.startsWith('Ac');
    }
);
}
function _wisdomUnits(){
return (
[
      {
        "t_minus": {
          "alias": "T-",
          "statement": "Risk group lives",
          "explanation": "Identified as negative risks in thesis context."
        },
        "t": {
          "alias": "T",
          "statement": "Pursue minister elimination",
          "explanation": "Derived from the original plan outlined in the context."
        },
        "t_plus": {
          "alias": "T+",
          "statement": "Achieve strategic goals",
          "explanation": "Derived from positive aspects of thesis pursuit."
        },
        "a_plus": {
          "alias": "A+",
          "statement": "Ensure survival peacefully",
          "explanation": "Positive aspect constructed to oppose thesis negative."
        },
        "a": {
          "alias": "A",
          "statement": "Accept ransom offer",
          "explanation": "Antithesis derived from opposing choice in scenario."
        },
        "a_minus": {
          "alias": "A-",
          "statement": "Compromise core ideals",
          "explanation": "Negative aspect formed to oppose thesis positive."
        }
      },
      {
        "t_minus": {
          "alias": "A4-",
          "statement": "Jeopardize safety",
          "explanation": "Identified as negative aspect of A."
        },
        "t": {
          "alias": "A4",
          "statement": "Pursue mission goals",
          "explanation": "Derived as antithesis of T."
        },
        "t_plus": {
          "alias": "A4+",
          "statement": "Uphold ideals",
          "explanation": "Identified as positive aspect of A."
        },
        "a_plus": {
          "alias": "T4+",
          "statement": "Promote survival",
          "explanation": "Identified as positive aspect of T."
        },
        "a": {
          "alias": "T4",
          "statement": "Ensure group safety",
          "explanation": "Inferred from the choice presented for living."
        },
        "a_minus": {
          "alias": "T4-",
          "statement": "Foster cowardice",
          "explanation": "Identified as negative aspect of T."
        }
      },
      {
        "t_minus": {
          "alias": "T2-",
          "statement": "Endanger lives",
          "explanation": "Derived by noting risks of engagement."
        },
        "t": {
          "alias": "T2",
          "statement": "Face soldier threat",
          "explanation": "Extracted from the warning issued by Bouteflika."
        },
        "t_plus": {
          "alias": "T2+",
          "statement": "Maintain integrity",
          "explanation": "Derived by identifying positive aspect of confrontation."
        },
        "a_plus": {
          "alias": "A2+",
          "statement": "Ensure survival",
          "explanation": "Derived as constructive side of alternative."
        },
        "a": {
          "alias": "A2",
          "statement": "Take ransom deal",
          "explanation": "Identified as opposing action."
        },
        "a_minus": {
          "alias": "A2-",
          "statement": "Compromise principles",
          "explanation": "Derived as negative side of acceptance."
        }
      },
      {
        "t_minus": {
          "alias": "T3-",
          "statement": "Betray allies mission",
          "explanation": "Extracted as the negative aspect from the context's implications of failing allies."
        },
        "t": {
          "alias": "T3",
          "statement": "Take twenty million",
          "explanation": "Identified from the offered alternative in the narrative."
        },
        "t_plus": {
          "alias": "T3+",
          "statement": "Gain safety wealth",
          "explanation": "Derived as the positive aspect by analyzing the benefits of acceptance."
        },
        "a_plus": {
          "alias": "A3+",
          "statement": "Uphold loyalty honor",
          "explanation": "Determined as the positive side that contradicts the negative aspect of the thesis."
        },
        "a": {
          "alias": "A3",
          "statement": "Refuse twenty million",
          "explanation": "Formulated as the antithesis opposing the primary thesis."
        },
        "a_minus": {
          "alias": "A3-",
          "statement": "Risk death failure",
          "explanation": "Ascertained as the negative side that contradicts the positive aspect of the thesis."
        }
      }
    ]
);
}
function _componentOrder(){
return (
[]
);
}
function _extractStatement(){
return (
(value) => {
        if (typeof value === 'string') return value;
        if (typeof value === 'object' && value !== null) {
          return value.statement || value.alias || '';
        }
        return '';
      }
);
}
function _transformWisdomUnitsToDialecticalData(extractStatement){
return (
(wisdomUnits, componentOrder) => {
      if (!wisdomUnits || wisdomUnits.length === 0) {
        return {};
      }
      const diabolicalData = {};
      wisdomUnits.forEach((unit, index) => {
        const thesisKey = unit.t.alias || `T${index + 1}`;
        diabolicalData[thesisKey] = {
          statement: extractStatement(unit.t),
          positive: extractStatement(unit.t_plus),
          negative: extractStatement(unit.t_minus),
          pairWith: unit.a.alias || `A${index + 1}`,
          pairId: `${(unit.t.alias + "_" + unit.a.alias) || `T${index + 1}_A${index + 1}`}`
        };
      })

      wisdomUnits.forEach((unit, index) => {
        const antithesisKey = unit.a.alias || `A${index + 1}`;
        diabolicalData[antithesisKey] = {
          statement: extractStatement(unit.a),
          positive: extractStatement(unit.a_plus),
          negative: extractStatement(unit.a_minus),
          pairWith: unit.t.alias || `T${index + 1}`,
          pairId: `${(unit.t.alias + "_" + unit.a.alias) || `T${index + 1}_A${index + 1}`}`
        };

      });
      if (!componentOrder || componentOrder.length === 0) {
        return diabolicalData;
      }

      const dialecticalDataOrdered = {};
      componentOrder.forEach((component) => {
        const key = component;

        dialecticalDataOrdered[key] = diabolicalData[key];

      });
      return dialecticalDataOrdered;
    }
);
}
function _mermaid_graph(mermaid){
return (
mermaid`graph TD
      W["wisdomUnits"] --> T["transformWisdomUnitsToDialecticalData"]
      C["componentOrder"] --> T
      T --> D["dialecticalData (Object)"]
      D --> FC["flowConnections"]
      D --> CC["contraConnections"]
      FC --> P["parseArrowConnectionsAsSourceTarget"]
      CC --> P
      D --> P
      P --> FS["flowSuits"]
      P --> CS["contraSuits"]
      FS --> G["graph"]
      CS --> G
      FZ["fontsize" ] --> G
      SF["selectedFont" ] --> G
      STY["styles" ] --> G
      D3["d3/drag" ] --> G

      classDef note fill:#fff,stroke:#999,color:#333;
      N1["nodes = Array.from(new Set(links.flatMap(s,t=>[s,t])))\n=> comes from links order, not D's key order"]:::note
      FS --> N1
      CS --> N1`
);
}
function _mermaid_graph_from_suits(mermaid){
return (
(suits) => {
      const types = Array.from(new Set(suits.map(d => d.type)));
      const nodes = Array.from(new Set(suits.flatMap(d => [d.source, d.target])));

      const scheme10 = [
        "#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd",
        "#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"
      ];
      const colorForType = (type) => scheme10[types.indexOf(type) % scheme10.length];

      const parts = [];
      parts.push("graph TD");
      nodes.forEach(id => {
        const safeId = String(id).replace(/[^A-Za-z0-9_]/g, "_");
        parts.push(`${safeId}["${id}"]`);
      });

      // Edges with labels and per-link styling via linkStyle index
      suits.forEach((d, i) => {
        const s = String(d.source).replace(/[^A-Za-z0-9_]/g, "_");
        const t = String(d.target).replace(/[^A-Za-z0-9_]/g, "_");
        const label = d.type ? `|${d.type}|` : "";
        parts.push(`${s} -->${label} ${t}`);
        const color = colorForType(d.type || "default");
        parts.push(`linkStyle ${i} stroke:${color},stroke-width:2px,opacity:0.85`);
      });

      const def = parts.join("\n");
      return mermaid`${def}`;
    }
);
}

export default function define(runtime, observer) {
  const main = runtime.module();

  function toString() { return this.url; }
  const fileAttachments = new Map([
    
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  main.variable(observer()).define(["md"], _1);
  main.variable(observer("makeRings")).define("makeRings", ["arcTween", "d3"], _makeRings);
  main.variable(observer("dialecticalData")).define("dialecticalData", ["transformWisdomUnitsToDialecticalData", "wisdomUnits", "componentOrder"], _dialecticalData);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("styles")).define("styles", ["userHubColor", "ringColors", "textColors"], _styles);
  main.variable(observer("arrowControls")).define("arrowControls", ["html", "parseArrowConnections", "arrowConnections", "dialecticalData", "viewof chart", "isThesisType", "arrowUtilities", "d3"], _arrowControls);
  main.variable(observer()).define(["unFocus", "viewof chart"], _2);
  main.variable(observer("viewof unFocus")).define("viewof unFocus", ["Inputs"], _unFocus);
  main.define("unFocus", ["Generators", "viewof unFocus"], (G, _) => G.input(_));
  main.variable(observer("viewof showFlow")).define("viewof showFlow", ["Inputs"], _showFlow);
  main.define("showFlow", ["Generators", "viewof showFlow"], (G, _) => G.input(_));
  main.variable(observer("showFlowSubscription")).define("showFlowSubscription", ["Generators", "viewof showFlow", "viewof chart", "d3", "invalidation"], _showFlowSubscription);
  main.variable(observer("viewof isWhiteOutside")).define("viewof isWhiteOutside", ["Inputs"], _isWhiteOutside);
  main.define("isWhiteOutside", ["Generators", "viewof isWhiteOutside"], (G, _) => G.input(_));
  main.variable(observer("userRingColors")).define("userRingColors", _userRingColors);
  main.variable(observer("userTextColors")).define("userTextColors", _userTextColors);
  main.variable(observer("userHubColor")).define("userHubColor", _userHubColor);
  main.variable(observer("ringColors")).define("ringColors", ["isWhiteOutside", "userRingColors"], _ringColors);
  main.variable(observer("textColors")).define("textColors", ["isWhiteOutside", "userTextColors"], _textColors);
  main.variable(observer("viewof whitesOnly")).define("viewof whitesOnly", ["Inputs"], _whitesOnly);
  main.define("whitesOnly", ["Generators", "viewof whitesOnly"], (G, _) => G.input(_));
  main.variable(observer("viewof TsOnly")).define("viewof TsOnly", ["Inputs"], _TsOnly);
  main.define("TsOnly", ["Generators", "viewof TsOnly"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM", "serialize", "viewof chart"], _3);
  main.variable(observer("makeArrowsModule")).define("makeArrowsModule", ["d3", "location"], _makeArrowsModule);
  main.variable(observer("radii")).define("radii", ["styles"], _radii);
  main.variable(observer("pie")).define("pie", ["d3"], _pie);
  main.variable(observer("arcs")).define("arcs", ["d3", "radii", "styles"], _arcs);
  main.variable(observer("colorScales")).define("colorScales", ["d3", "dialecticalData", "styles"], _colorScales);
  main.variable(observer("arcTween")).define("arcTween", ["d3"], _arcTween);
  main.variable(observer("makeTextTransform")).define("makeTextTransform", _makeTextTransform);
  main.variable(observer("makeAxisModule")).define("makeAxisModule", ["d3"], _makeAxisModule);
  main.variable(observer("makeStepMode")).define("makeStepMode", ["d3"], _makeStepMode);
  main.variable(observer("viewof chart")).define("viewof chart", ["styles", "radii", "d3", "selectedFont", "dialecticalData", "arcs", "makeTextTransform", "pie", "transformToNestedPieData", "makeAxisModule", "getOppositePrefix", "colorScales", "getTextConstraints", "wrapText", "isThesisType", "arcTween", "makeRings", "makeArrowsModule", "arrowUtilities", "parseArrowConnections", "arrowConnections", "flowConnections", "makeStepMode", "initializeBuildSteps"], _chart);
  main.define("chart", ["Generators", "viewof chart"], (G, _) => G.input(_));
  main.variable(observer("stepControls")).define("stepControls", ["html", "viewof chart"], _stepControls);
  main.variable(observer("focusedSlice")).define("focusedSlice", ["chart"], _focusedSlice);
  main.variable(observer()).define(["chart"], _4);
  main.variable(observer("viewof sliceNumber")).define("viewof sliceNumber", ["Inputs", "viewof chart"], _sliceNumber);
  main.define("sliceNumber", ["Generators", "viewof sliceNumber"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof chart", "sliceNumber"], _5);
  main.variable(observer("clickedCellObject")).define("clickedCellObject", ["chart"], _clickedCellObject);
  main.variable(observer("clickedCellText")).define("clickedCellText", ["chart"], _clickedCellText);
  main.variable(observer("topSlice")).define("topSlice", ["chart", "dialecticalData"], _topSlice);
  main.variable(observer("topSliceTracker")).define("topSliceTracker", ["html", "chart", "dialecticalData"], _topSliceTracker);
  main.variable(observer("parseArrowConnections")).define("parseArrowConnections", _parseArrowConnections);
  main.variable(observer("dotScriptEditor")).define("dotScriptEditor", ["html", "dialecticalData", "arrowConnections", "viewof chart", "parseArrowConnections"], _dotScriptEditor);
  main.variable(observer("arrowConnections")).define("arrowConnections", ["dialecticalData"], _arrowConnections);
  main.variable(observer("flowConnections")).define("flowConnections", ["dialecticalData"], _flowConnections);
  main.variable(observer("contraConnections")).define("contraConnections", ["dialecticalData"], _contraConnections);
  main.variable(observer("parseArrowConnectionsAsSourceTarget")).define("parseArrowConnectionsAsSourceTarget", _parseArrowConnectionsAsSourceTarget);
  main.variable(observer()).define(_6);
  main.variable(observer("transformToNestedPieData")).define("transformToNestedPieData", ["isWhiteOutside", "whitesOnly", "TsOnly"], _transformToNestedPieData);
  main.variable(observer("wrapText")).define("wrapText", ["styles", "tryWrapWithLineBreaks", "truncateWithEllipses"], _wrapText);
  main.variable(observer("tryWrapWithLineBreaks")).define("tryWrapWithLineBreaks", _tryWrapWithLineBreaks);
  main.variable(observer("truncateWithEllipses")).define("truncateWithEllipses", _truncateWithEllipses);
  main.variable(observer("getTextConstraints")).define("getTextConstraints", ["styles"], _getTextConstraints);
  main.variable(observer("arrowUtilities")).define("arrowUtilities", ["isThesisType"], _arrowUtilities);
  main.variable(observer("getPointAlongQuadraticCurve")).define("getPointAlongQuadraticCurve", ["arrowUtilities"], _getPointAlongQuadraticCurve);
  main.variable(observer("initializeBuildSteps")).define("initializeBuildSteps", ["getOppositePrefix", "isThesisType"], _initializeBuildSteps);
  main.variable(observer("longPressUtilities")).define("longPressUtilities", ["d3"], _longPressUtilities);
  main.variable(observer("viewof selectedFont")).define("viewof selectedFont", ["Inputs"], _selectedFont);
  main.define("selectedFont", ["Generators", "viewof selectedFont"], (G, _) => G.input(_));
  main.variable(observer("parseFont")).define("parseFont", ["selectedFont"], _parseFont);
  main.variable(observer("style")).define("style", ["html", "parseFont", "selectedFont"], _style);
  main.variable(observer("fontCDN")).define("fontCDN", ["parseFont"], _fontCDN);
  main.variable(observer("serialize")).define("serialize", ["NodeFilter"], _serialize);
  main.variable(observer("rasterize")).define("rasterize", ["DOM", "serialize"], _rasterize);
  main.variable(observer()).define(["DOM", "rasterize", "viewof chart"], _7);
  main.variable(observer("viewof fontsize")).define("viewof fontsize", ["Inputs"], _fontsize);
  main.define("fontsize", ["Generators", "viewof fontsize"], (G, _) => G.input(_));
  main.variable(observer("viewof rotationAngle")).define("viewof rotationAngle", ["Inputs"], _rotationAngle);
  main.define("rotationAngle", ["Generators", "viewof rotationAngle"], (G, _) => G.input(_));
  main.variable(observer()).define(["rotationAngle"], _8);
  main.variable(observer("graph")).define("graph", ["componentOrder", "styles", "flowSuits", "contraSuits", "d3", "location", "drag", "fontsize", "selectedFont", "invalidation"], _graph);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("flowSuits")).define("flowSuits", ["parseArrowConnectionsAsSourceTarget", "flowConnections", "dialecticalData"], _flowSuits);
  main.variable(observer("contraSuits")).define("contraSuits", ["parseArrowConnectionsAsSourceTarget", "contraConnections", "dialecticalData"], _contraSuits);
  main.variable(observer("suits")).define("suits", ["flowSuits", "contraSuits"], _suits);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1); 
  main.variable(observer("getOppositePrefix")).define("getOppositePrefix", _getOppositePrefix);
  main.variable(observer("getUnitType")).define("getUnitType", _getUnitType);
  main.variable(observer("isThesisType")).define("isThesisType", _isThesisType);
  main.variable(observer("isAntithesisType")).define("isAntithesisType", _isAntithesisType);
  main.variable(observer("wisdomUnits")).define("wisdomUnits", _wisdomUnits);
  main.variable(observer("componentOrder")).define("componentOrder", _componentOrder);
  main.variable(observer("extractStatement")).define("extractStatement", _extractStatement);
  main.variable(observer("transformWisdomUnitsToDialecticalData")).define("transformWisdomUnitsToDialecticalData", ["extractStatement"], _transformWisdomUnitsToDialecticalData);
  main.variable(observer("mermaid_graph")).define("mermaid_graph", ["mermaid"], _mermaid_graph);
  main.variable(observer("mermaid_graph_from_suits")).define("mermaid_graph_from_suits", ["mermaid"], _mermaid_graph_from_suits);

  return main;
}