/*****************************************************
 * DATA
 *****************************************************/
const modules = [
  {
    image: "reading.png",
    title: "How Children Learn to Read",
    subtitle: "Syllables • Phonemes • Progression",
    link: "https://syllableacq.netlify.app/"
  },
  {
    image: "growth.jpg",
    title: "How Learning Improves Over Time",
    subtitle: "Practice • Assessment • Growth",
    link: "https://student4journey.netlify.app/"
  },
  {
    image: "teacher.png",
    title: "What Teachers Experience",
    subtitle: "Evidence from Classrooms",
    link: "voices.html"
  },
  {
    image: "math.png",
    title: "How AML Enables Practice",
    subtitle: "Number Sense • Fluency • Feedback",
    link: "https://aml2practice.netlify.app/"
  }
];

function renderLauncher() {

  d3.select("#launcher").selectAll("*").remove();

  const width = window.innerWidth;
  const height = window.innerHeight - 170; // header space

  const svg = d3.select("#launcher")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  /*****************************************************
   * FIXED TABLET OPTIMIZED DIMENSIONS
   *****************************************************/

  const radius = height * 0.14;         // tuned for 16:10
  const horizontalGap = width * 0.18;   // more horizontal breathing
  const verticalGap = height * 0.08;    // safe vertical space
  const textOffset = 95;                // reserved text space

  const columns = 2;
  const rows = 2;

  const gridWidth =
    columns * (radius * 2) + horizontalGap;

  const gridHeight =
    rows * (radius * 2 + textOffset) + verticalGap;

  const startX = (width - gridWidth) / 2;
  const startY = (height - gridHeight) / 2;

  const nodes = svg.selectAll(".module")
    .data(modules)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {

      const col = i % 2;
      const row = Math.floor(i / 2);

      const x = startX + col * (radius * 2 + horizontalGap) + radius;
      const y = startY + row * (radius * 2 + textOffset + verticalGap) + radius;

      return `translate(${x}, ${y})`;
    })
    .style("cursor", "pointer");

  /*****************************************************
   * CIRCLE
   *****************************************************/
  nodes.append("circle")
    .attr("r", radius)
    .attr("fill", "#ffffff")
    .attr("stroke", "#2C3E6E")
    .attr("stroke-width", 3);

  /*****************************************************
   * IMAGE
   *****************************************************/
  nodes.append("image")
    .attr("href", d => d.image)
    .attr("x", -radius * 0.5)
    .attr("y", -radius * 0.5)
    .attr("width", radius)
    .attr("height", radius);

  /*****************************************************
   * TITLE (AUTO WRAPPED)
   *****************************************************/
  nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", 600)
    .attr("fill", "#1E2F57")
    .attr("y", radius + 35)
    .each(function(d) {

      const words = d.title.split(" ");
      const line1 = words.slice(0, Math.ceil(words.length/2)).join(" ");
      const line2 = words.slice(Math.ceil(words.length/2)).join(" ");

      d3.select(this)
        .append("tspan")
        .attr("x", 0)
        .attr("dy", 0)
        .text(line1);

      d3.select(this)
        .append("tspan")
        .attr("x", 0)
        .attr("dy", 22)
        .text(line2);
    });

  /*****************************************************
   * SUBTITLE
   *****************************************************/
  nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "#6B778C")
    .attr("y", radius + 75)
    .text(d => d.subtitle);

  /*****************************************************
   * HOVER
   *****************************************************/
  nodes
    .on("mouseenter", function () {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("stroke", "#F2B21B");
    })
    .on("mouseleave", function () {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("stroke", "#2C3E6E");
    })
    .on("click", (e, d) => window.location.href = d.link);
}

renderLauncher();
window.addEventListener("resize", renderLauncher);
window.addEventListener("orientationchange", renderLauncher);