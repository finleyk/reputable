let gl;
let shaderProgram;
let modelMatrix = mat4.create();
let viewMatrix = mat4.create();
let projectionMatrix = mat4.create();

function start() {
    const canvas = document.getElementById("webglCanvas");
    gl = canvas.getContext("webgl");

    if (!gl) {
        alert("WebGL not supported, please use a compatible browser.");
        return;
    }

    const vertexShaderSource = `
        attribute vec4 a_position;
        uniform mat4 u_modelMatrix;
        uniform mat4 u_viewMatrix;
        uniform mat4 u_projectionMatrix;

        void main() {
            gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * a_position;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    shaderProgram = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(shaderProgram);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
    const modelMatrixLocation = gl.getUniformLocation(shaderProgram, "u_modelMatrix");
    const viewMatrixLocation = gl.getUniformLocation(shaderProgram, "u_viewMatrix");
    const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "u_projectionMatrix");

    gl.enableVertexAttribArray(positionAttributeLocation);

    // Initialize the Menger sponge model here (e.g., generate vertices)

    gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    // Add event listeners for mouse interaction
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);

    requestAnimationFrame(render);
}

function render() {
    // Update model, view, and projection matrices based on interaction or animation

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw the Menger sponge here using WebGL drawing functions

    requestAnimationFrame(render);
}

function onMouseDown(event) {
    // Handle mouse down event (e.g., start rotation)
}

function onMouseUp(event) {
    // Handle mouse up event (e.g., stop rotation)
}

function onMouseMove(event) {
    // Handle mouse move event (e.g., update rotation based on mouse movement)
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

window.addEventListener("load", start);