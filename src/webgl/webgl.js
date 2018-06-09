// import mat4 from 'gl-mat4';
//
// export function initWebGL(canvas) {
//   const gl = canvas.getContext('webgl');
//   if (!gl) {
//     alert("Unable to initialize WebGL. Your browser or machine may not support it.");
//     return;
//   }
//
//   // Set clear color to black, fully opaque
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);
//   // Clear the color buffer with specified clear color
//   gl.clear(gl.COLOR_BUFFER_BIT);
//
//   const vsSource = `
//     attribute vec4 aVertexPosition;
//     attribute vec4 aVertexColor;
//     uniform mat4 uModelViewMatrix;
//     uniform mat4 uProjectionMatrix;
//     varying lowp vec4 vColor;
//     void main(void) {
//       gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
//       vColor = aVertexColor;
//     }
//   `;
//
//   // Fragment shader program
//
//   const fsSource = `
//     varying lowp vec4 vColor;
//     void main(void) {
//       gl_FragColor = vColor;
//     }
//   `;
//
//   const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
//
//   const programInfo = {
//     program: shaderProgram,
//     attribLocations: {
//       vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
//       vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
//     },
//     uniformLocations: {
//       projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
//       modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
//     },
//   };
//
//   return {gl:gl, pi:programInfo, b:initBuffers(gl)};
// }
//
//
// //
// // Initialize a shader program, so WebGL knows how to draw our data
// //
// function initShaderProgram(gl, vsSource, fsSource) {
//   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
//   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
//
//   // Create the shader program
//
//   const shaderProgram = gl.createProgram();
//   gl.attachShader(shaderProgram, vertexShader);
//   gl.attachShader(shaderProgram, fragmentShader);
//   gl.linkProgram(shaderProgram);
//
//   // If creating the shader program failed, alert
//
//   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//     alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
//     return null;
//   }
//
//   return shaderProgram;
// }
//
// //
// // creates a shader of the given type, uploads the source and
// // compiles it.
// //
// function loadShader(gl, type, source) {
//   const shader = gl.createShader(type);
//
//   // Send the source to the shader object
//
//   gl.shaderSource(shader, source);
//
//   // Compile the shader program
//
//   gl.compileShader(shader);
//
//   // See if it compiled successfully
//
//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }
//
//   return shader;
// }
//
//
// function initBuffers(gl) {
//
//   // Create a buffer for the square's positions.
//
//   const positionBuffer = gl.createBuffer();
//
//   // Select the positionBuffer as the one to apply buffer
//   // operations to from here out.
//
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//
//   // Now create an array of positions for the square.
//
//   // const positions = [
//   //    1.0,  1.0,
//   //    0.0,  1.0,
//   //    1.0,  0.0,
//   //    0.0,  0.0,
//   // ];
//
//   const positions = [
//      0.9,  0.9,
//      0.0,  0.9,
//      0.9,  0.0,
//      0.0,  0.0,
//   ];
//
//   // Now pass the list of positions into WebGL to build the
//   // shape. We do this by creating a Float32Array from the
//   // JavaScript array, then use it to fill the current buffer.
//
//   gl.bufferData(gl.ARRAY_BUFFER,
//     new Float32Array(positions),
//     gl.STATIC_DRAW);
//
//   var colors = [
//     1.0,  1.0,  1.0,  1.0,    // white
//     0.3,  0.1,  0.3,  0.3,    // red
//     1.0,  0.0,  1.0,  1.0,    // green
//     0.3,  0.3,  0.3,  0.3,    // blue
//   ];
//
//   const colorBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
//
//   const colorsD = [
//     1.0,  1.0,  1.0,  1.0,    // white
//     0.1,  0.2,  0.1,  0.1,    // red
//     0.9,  0.9,  0.9,  0.9,    // red
//     0.1,  0.2,  0.1,  0.1,    // red
//   ];
//
//   const colorBufferD = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferD);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsD), gl.STATIC_DRAW);
//
//   return {
//     position: positionBuffer,
//     alive: colorBuffer,
//     dead: colorBufferD
//   };
// }
//
//
// export function drawScene(gl, programInfo, buffers, grid, w, h, c) {
//   gl.clearColor(0.3, 0.7 * 1/c, 1.0, 1.0);  // Clear to black, fully opaque
//   gl.clearDepth(1.0);                 // Clear everything
//
//   // Clear the canvas before we start drawing on it.
//
//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//
//   const pMatrix = mat4.create();
//   gl.viewport(0, 0, w*c, h*c);
//   mat4.ortho(pMatrix, 0, w, h, 0, 0.1, 100);
//
//   // Set the drawing position to the "identity" point, which is
//   // the center of the scene.
//
//
//   // Now move the drawing position a bit to where we want to
//   // start drawing the square.
//
//
//   // Tell WebGL how to pull out the positions from the position
//   // buffer into the vertexPosition attribute.
//   for (let i = 0; i < h; i++)  {
//     for (let j = 0; j < w; j++)  {
//       const modelViewMatrix = mat4.create();
//       mat4.translate(modelViewMatrix,     // destination matrix
//                      modelViewMatrix,     // matrix to translate
//                      [1.0*j, 1.0 * i, -0.1]);  // amount to translate
//
//       // mat4.scale(modelViewMatrix, modelViewMatrix, [c-1, c-1, 1]);
//
//       const numComponents = 2;  // pull out 2 values per iteration
//       const type = gl.FLOAT;    // the data in the buffer is 32bit floats
//       const normalize = false;  // don't normalize
//       const stride = 0;         // how many bytes to get from one set of values to the next
//                                 // 0 = use type and numComponents above
//       const offset = 0;         // how many bytes inside the buffer to start from
//       gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
//       gl.vertexAttribPointer(
//           programInfo.attribLocations.vertexPosition,
//           numComponents,
//           type,
//           normalize,
//           stride,
//           offset);
//       gl.enableVertexAttribArray(
//           programInfo.attribLocations.vertexPosition);
//           {
//             const numComponents = 4;
//             const type = gl.FLOAT;
//             const normalize = false;
//             const stride = 0;
//             const offset = 0;
//             const b = grid[i][j] ? buffers.alive : buffers.dead;
//             gl.bindBuffer(gl.ARRAY_BUFFER, b);
//             gl.vertexAttribPointer(
//                 programInfo.attribLocations.vertexColor,
//                 numComponents,
//                 type,
//                 normalize,
//                 stride,
//                 offset);
//             gl.enableVertexAttribArray(
//                 programInfo.attribLocations.vertexColor);
//           }
//
//
//       // Tell WebGL to use our program when drawing
//
//       gl.useProgram(programInfo.program);
//
//       // Set the shader uniforms
//
//       gl.uniformMatrix4fv(
//           programInfo.uniformLocations.projectionMatrix,
//           false,
//           pMatrix);
//       gl.uniformMatrix4fv(
//           programInfo.uniformLocations.modelViewMatrix,
//           false,
//           modelViewMatrix);
//       {
//         const offset = 0;
//         const vertexCount = 4;
//         gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
//       }
//     }
//   }
// }
