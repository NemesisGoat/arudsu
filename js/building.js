AFRAME.registerComponent("university-building", {
    init: function () {
        const group = this.el.object3D;

        const mat = {
            wall:     new THREE.MeshStandardMaterial({ color: 0x8fa888 }),
            pilaster: new THREE.MeshStandardMaterial({ color: 0xd9d4b8 }),
            base:     new THREE.MeshStandardMaterial({ color: 0x2e5c3e }),
            stone:    new THREE.MeshStandardMaterial({ color: 0x3a4f3e }),
            white:    new THREE.MeshStandardMaterial({ color: 0xf0efeb }),
            roof:     new THREE.MeshStandardMaterial({ color: 0x6a6e6a }),
            dome:     new THREE.MeshStandardMaterial({ color: 0x3d6b4f }),
            gold:     new THREE.MeshStandardMaterial({ color: 0xd4af37 }),
            portiko:  new THREE.MeshStandardMaterial({ color: 0x1e3d2a }),
            glass:    new THREE.MeshStandardMaterial({ color: 0xb8d8dc, transparent: true, opacity: 0.8 }),
            door:     new THREE.MeshStandardMaterial({ color: 0xffffff }),
            step:     new THREE.MeshStandardMaterial({ color: 0x7a8070 }),
        };

        const box = (w, h, d, m, x=0, y=0, z=0) => {
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
            mesh.position.set(x, y, z);
            group.add(mesh);
            return mesh;
        };
        const cyl = (rt, rb, h, seg, m, x=0, y=0, z=0) => {
            const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
            mesh.position.set(x, y, z);
            group.add(mesh);
            return mesh;
        };
        const hdome = (r, m, x=0, y=0, z=0) => {
            const mesh = new THREE.Mesh(
                new THREE.SphereGeometry(r, 24, 16, 0, Math.PI*2, 0, Math.PI/2), m);
            mesh.position.set(x, y, z);
            group.add(mesh);
            return mesh;
        };
        const cone = (r, h, seg, m, x=0, y=0, z=0) => {
            const mesh = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), m);
            mesh.position.set(x, y, z);
            group.add(mesh);
            return mesh;
        };

        
        const OW = 22;   
        const OD = 16;   
        const WT = 3.5;  
        const BH = 1.2;  
        const H  = 8.0;  
        const roofY = BH + H;

        
        const IW = OW - WT*2;  
        const ID = OD - WT*2;  


        function addWing(w, h, d, cx, cz) {
            box(w+0.3, BH, d+0.3, mat.base, cx, BH/2, cz);
            box(w, H, d, mat.wall, cx, BH+H/2, cz);
        }

        addWing(OW, H, WT, 0, OD/2 - WT/2);

        addWing(OW, H, WT, 0, -OD/2 + WT/2);

        addWing(WT, H, ID, -OW/2 + WT/2, 0);

        addWing(WT, H, ID, OW/2 - WT/2, 0);

        
        const rH = 0.6; 

       
        box(OW+0.5, 0.4, WT+0.5, mat.white, 0,        roofY+0.2,  OD/2-WT/2); 
        box(OW+0.5, 0.4, WT+0.5, mat.white, 0,        roofY+0.2, -OD/2+WT/2); 
        box(WT+0.5, 0.4, ID+0.5, mat.white, -OW/2+WT/2, roofY+0.2, 0);        
        box(WT+0.5, 0.4, ID+0.5, mat.white,  OW/2-WT/2, roofY+0.2, 0);        

        
        box(OW+0.3, rH, WT+0.3, mat.roof, 0,         roofY+0.6,  OD/2-WT/2); 
        box(OW+0.3, rH, WT+0.3, mat.roof, 0,         roofY+0.6, -OD/2+WT/2); 
        box(WT+0.3, rH, ID+0.3, mat.roof, -OW/2+WT/2, roofY+0.6, 0);         
        box(WT+0.3, rH, ID+0.3, mat.roof,  OW/2-WT/2, roofY+0.6, 0);         

      
        box(OW+0.3, 0.5, 0.2, mat.white, 0,          roofY+1.1,  OD/2+0.15); 
        box(OW+0.3, 0.5, 0.2, mat.white, 0,          roofY+1.1, -OD/2-0.15); 
        box(0.2, 0.5, OD+0.3, mat.white, -OW/2-0.15, roofY+1.1, 0);          
        box(0.2, 0.5, OD+0.3, mat.white,  OW/2+0.15, roofY+1.1, 0);          

    
        const fZ = OD/2; 

        box(OW+0.1, 0.26, WT+0.1, mat.white, 0, BH+H*0.5, OD/2-WT/2);

       
        [-9.5, -6.8, -4.2, 4.2, 6.8, 9.5].forEach(x => {
            box(0.55, H+0.1, WT+0.2, mat.pilaster, x, BH+H/2, OD/2-WT/2);
        });
        
        [-(OW/2-0.45), OW/2-0.45].forEach(x => {
            box(0.9, H+0.1, WT+0.25, mat.pilaster, x, BH+H/2, OD/2-WT/2);
        });

        [-7.9, -5.4, 5.4, 7.9].forEach(x => {
            box(2.0, 0.2, 0.35, mat.white, x, roofY+0.85, fZ-0.05);
            const pts = [new THREE.Vector2(-1.0,0), new THREE.Vector2(1.0,0), new THREE.Vector2(0,0.72)];
            const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {depth:0.22, bevelEnabled:false});
            const m = new THREE.Mesh(geo, mat.white);
            m.position.set(x-1.0, roofY+0.85, fZ-0.02);
            group.add(m);
        });

        const pW=4.8, pD=1.3, pH=H+0.9;
        box(pW, pH, pD, mat.portiko, 0, BH+pH/2, fZ+pD/2);
        box(pW+0.4, 0.35, pD+0.3, mat.white, 0, BH+pH+0.17, fZ+pD/2);

  
        [-1.6, -0.54, 0.54, 1.6].forEach(x => {
            cyl(0.17, 0.17, pH-0.5, 16, mat.white, x, BH+(pH-0.5)/2+0.4, fZ+pD-0.08);
        });


        box(pW+0.3, 0.22, 1.05, mat.white, 0, BH+2.6, fZ+pD+0.38);
        for (let i=-2.2; i<=2.2; i+=0.32) {
            box(0.07, 0.5, 0.07, mat.white, i, BH+2.35, fZ+pD+0.38);
        }


        const archZ = fZ + pD + 0.12;
        box(3.5, BH+1.25, pD+0.28, mat.stone, 0, (BH+1.25)/2, fZ+pD/2+0.05);



        box(1.9, 1.48, 0.06, mat.glass, 0, BH+0.74, archZ+0.07);
        const gd = new THREE.Mesh(
            new THREE.SphereGeometry(0.97, 16, 8, 0, Math.PI*2, 0, Math.PI/2), mat.glass);
        gd.position.set(0, BH+1.48, archZ+0.07);
        group.add(gd);

        
        box(0.52, 1.28, 0.07, mat.door, -0.6,  BH+0.64, archZ+0.09);
        box(0.52, 1.28, 0.07, mat.door,  0.6,  BH+0.64, archZ+0.09);

        for (let i=0; i<4; i++) {
            box(4.6-i*0.4, 0.22, 0.65, mat.step,
                0, 0.11+i*0.22, fZ+pD+0.62+i*0.33);
        }

      
        const wW=0.58, wH=0.76;
        const rowY = [BH+0.9, BH+2.18, BH+3.46, BH+4.74];

        [-8.7, -7.45, -6.1, -5.0, -3.4, -2.2].forEach(x => {
            rowY.forEach(y => box(wW, wH, 0.07, mat.glass, x, y, fZ+0.05));
        });
        [2.2, 3.4, 5.0, 6.1, 7.45, 8.7].forEach(x => {
            rowY.forEach(y => box(wW, wH, 0.07, mat.glass, x, y, fZ+0.05));
        });

        
        [-2.15, 2.15].forEach(x => {
            [BH+2.18, BH+3.46, BH+4.74].forEach(y =>
                box(wW, wH, 0.07, mat.glass, x, y, fZ+pD+0.1));
        });

        
        [-8.5, -6.8, -5.2, -3.5, 3.5, 5.2, 6.8, 8.5].forEach(x => {
            box(0.5, 0.38, 0.07, mat.glass, x, BH*0.55, fZ+0.05);
        });

        
        const sideZ = [OD/2-WT*0.5, OD/2-WT*1.5, -OD/2+WT*1.5, -OD/2+WT*0.5];
        
        sideZ.forEach(z => {
            rowY.forEach(y => box(0.07, wH, wW, mat.glass, -OW/2-0.05, y, z));
        });
        
        sideZ.forEach(z => {
            rowY.forEach(y => box(0.07, wH, wW, mat.glass, OW/2+0.05, y, z));
        });

    
        const tx = -OW/2 + WT/2, tz = OD/2 - WT/2;
        
        box(2.0, 0.5, 2.0, mat.white, tx, roofY+0.45, tz);
        
        cyl(1.05, 1.05, 1.85, 16, mat.white, tx, roofY+1.5, tz);
        
        hdome(1.05, mat.dome, tx, roofY+2.42, tz);
        
        cone(0.07, 0.75, 8, mat.gold, tx, roofY+3.52, tz);
        
        [0,1,2,3].forEach(i => {
            const a = (i/4)*Math.PI*2 + Math.PI/4;
            box(0.07, 0.45, 0.33, mat.glass,
                tx+Math.sin(a)*1.05, roofY+1.5, tz+Math.cos(a)*1.05);
        });

        
        const cX=0, cZ=OD/2-WT/2; 
        const cBase = roofY + rH + 0.6; 

        
        box(3.0, 0.5, 3.0, mat.white, cX, cBase, cZ);
        
        cyl(1.2, 1.2, 2.0, 16, mat.white, cX, cBase+0.25+1.0, cZ);
        
        hdome(1.2, mat.dome, cX, cBase+0.25+2.0, cZ);
   
        cone(0.09, 0.88, 8, mat.gold, cX, cBase+0.25+3.28, cZ);
        
        [0,1,2,3,4,5].forEach(i => {
            const a = (i/6)*Math.PI*2;
            box(0.07, 0.55, 0.38, mat.glass,
                cX+Math.sin(a)*1.2, cBase+0.25+1.0, cZ+Math.cos(a)*1.2);
        });

        
        group.add(new THREE.AmbientLight(0xffffff, 0.65));
        const sun = new THREE.DirectionalLight(0xfff5e8, 1.2);
        sun.position.set(12, 22, 14);
        group.add(sun);
        const fill = new THREE.DirectionalLight(0xe8f0ff, 0.3);
        fill.position.set(-8, 5, -10);
        group.add(fill);

        
        group.scale.set(0.09, 0.09, 0.09);
        group.position.y = 0;
    }
});
