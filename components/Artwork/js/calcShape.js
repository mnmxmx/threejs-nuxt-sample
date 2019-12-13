export default {
    sphere: function(x, y){
        const u = -x * 2.0 * Math.PI;
        const v = y * Math.PI;

        const _x = Math.sin(u) * Math.sin(v);
        const _y = Math.cos(u) * Math.sin(v);
        const _z = Math.cos(v);

        return {x: _x * 3.0, y: _y * 3.0, z: _z * 3.0};
    },
    twistTorus: function(x, y){
        const a = 3.0;
        const n = 3.0;
        const m = 1.0;

        const u = x * 4.0 * Math.PI;
        const v = y * 2.0 * Math.PI;

        const _x = (a + Math.cos(n * u / 2.0) * Math.sin(v) - Math.sin(n * u / 2.0) * Math.sin(2.0 * v)) * Math.cos(m * u / 2.0);
        const _y = (a + Math.cos(n * u / 2.0) * Math.sin(v) - Math.sin(n * u / 2.0) * Math.sin(2.0 * v)) * Math.sin(m * u / 2.0);
        const _z = Math.sin(n * u / 2.0) * Math.sin(v) + Math.cos(n * u / 2.0) * Math.sin(2.0 * v);

        return {x: _x, y: _y, z: _z};
    },
    torus: function(x, y){
        const a = 3.0;
        const n = 1.5;

        const u = x * 2.0 * Math.PI;
        const v = y * 2.0 * Math.PI;

        const _x = ( a + n * Math.cos( v ) ) * Math.cos( u );
        const _y = ( a + n * Math.cos( v ) ) * Math.sin( u );
        const _z = n * Math.sin( v );

        return {x: _x, y: _y, z: _z};
    }
}