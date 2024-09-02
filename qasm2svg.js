const fs = require("node:fs");
const { program } = require("commander");
const QuantumCircuit = require("quantum-circuit");
const { exit } = require("node:process");

const SvgDisplayOptions = {
  embedded: false,
  cellWidth: 40,
  cellHeight: 40,
  hSpacing: 20,
  vSpacing: 24,
  blackboxPaddingX: 2,
  blackboxPaddingY: 2,
  blackboxLineColor: "black",
  blackboxSelectedLineColor: "black",
  wireColor: "black",
  gateLineColor: "black",
  gateSelectedLineColor: "black",
  cWireColor: "silver",
  cWireSelectedColor: "silver",
  cArrowSize: 16,
  hWireColor: "black",
  edWireColor: "black",
  wireWidth: "3",
  wireTextHeight: 8,
  wireTextDown: 16,
  wireMargin: 20,
  wireLabelWidth: 40,
  dotRadius: 8,
  paramTextHeight: 6,
  selectionPaddingX: 4,
  selectionPaddingY: 4,
  selectionLineColor: "#2185D0",
  drawBlochSpheres: false,
};

function main(qasm_string, output_file, config) {
  var circuit = new QuantumCircuit(9);

  circuit.importQASM(qasm_string, function (errors) {
    if (errors.length == 0) {
      console.log(`Successfully parsed QASM file`);
    } else {
      console.error(`Error importing QASM data {qasm_string}\n: ${errors}`);
      exit(1);
    }
  });

  let svg = circuit.exportSVG(true, config);

  try {
    fs.writeFileSync(output_file, svg);
    console.log(`Successfully wrote SVG file to: ${output_file}`);
  } catch (err) {
    console.error(`Error writing SVG file to output: ${err}`);
    exit(1);
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
  const qasm = fs.readFileSync(input, { encoding: "utf-8", flag: "r" });
  main(qasm, output, svg_opts);
} catch (e) {
  console.error(`Error reading input file ${input}: ${e}`);
  exit(1);
}
