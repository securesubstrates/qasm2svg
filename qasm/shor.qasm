OPENQASM 2.0;
include "qelib1.inc";
qreg q[9];
creg c[1];
cx q[0],q[3];
cx q[0],q[6];
h q[0];
h q[3];
h q[6];
cx q[0],q[1];
cx q[3],q[4];
cx q[6],q[7];
cx q[0],q[2];
cx q[3],q[5];
cx q[6],q[8];
barrier q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7],q[8];
x q[0];
z q[0];
barrier q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7],q[8];
cx q[0],q[1];
cx q[3],q[4];
cx q[6],q[7];
cx q[0],q[2];
cx q[3],q[5];
cx q[6],q[8];
ccx q[1],q[2],q[0];
ccx q[4],q[5],q[3];
ccx q[8],q[7],q[6];
h q[0];
h q[3];
h q[6];
cx q[0],q[3];
cx q[0],q[6];
ccx q[6],q[3],q[0];
barrier q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7],q[8];
measure q[0] -> c[0];