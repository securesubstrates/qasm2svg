const fs = require("node:fs");
const { program } = require("commander");
const QuantumCircuit = require("quantum-circuit");
const { exit } = require("node:process");

const SvgDisplayOptions = {
  embedded: false,
  cellWidth: 40,
  cellHeight: 40,
  hSpacing: 28,
  vSpacing: 34,
  blackboxPaddingX: 2,
  blackboxPaddingY: 2,
  blackboxLineColor: "black",
  blackboxSelectedLineColor: "black",
  wireColor: "black",
  gateLineColor: "black",
  gateSelectedLineColor: "black",
  cWireColor: "silver",
  cWireSelectedColor: "silver",
  cArrowSize: 10,
  hWireColor: "black",
  edWireColor: "black",
  wireWidth: "1",
  wireTextHeight: 8,
  wireTextDown: 16,
  wireMargin: 20,
  wireLabelWidth: 40,
  dotRadius: 5,
  paramTextHeight: 6,
  selectionPaddingX: 4,
  selectionPaddingY: 4,
  selectionLineColor: "#2185D0",
  drawBlochSpheres: true,
};

function main(qasm_string, output_file, config) {
  var circuit = new QuantumCircuit(9);

  circuit.importQASM(qasm_string, function (errors) {
    console.log(`Error importing QASM file: ${errors}`);
    return;
  });

  let svg = circuit.exportSVG(false, config);

  try {
    fs.writeFileSync(output_file, svg);
    console.log(`Successfully wrote SVG file to: ${output_file}`);
  } catch (err) {
    console.error(`Error writing SVG file to output: ${err}`);
  }
}

program
  .option("-i, --input <qasm-file>", "Input QASM file")
  .option("-o, --output <svg-file>", "Output SVG file name")
  .option("-c, --svg-conf [svg-config]", "SVG CSS/Color Configuration")
  .parse();

const opts = program.opts();
const input = opts.input;
const output = opts.output;
const svg_opts = opts.svg_conf || SvgDisplayOptions;

try {
  const qasm = fs.readFileSync(input, "utf-8");
  main(qasm, output, svg_opts);
} catch (e) {
  console.error(`Error reading input file ${input}: ${e}`);
}
