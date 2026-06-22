AFRAME.registerComponent("university-building", {

    init: function () {

        const group = this.el.object3D;

        const materials = {

            wall: new THREE.MeshStandardMaterial({
                color: 0xcfd6cf
            }),

            base: new THREE.MeshStandardMaterial({
                color: 0x5d7f70
            }),

            dark: new THREE.MeshStandardMaterial({
                color: 0x2f5b47
            }),

            white: new THREE.MeshStandardMaterial({
                color: 0xffffff
            }),

            roof: new THREE.MeshStandardMaterial({
                color: 0x777777
            }),

            dome: new THREE.MeshStandardMaterial({
                color: 0x3d5f4f
            }),

            stone: new THREE.MeshStandardMaterial({
                color: 0x4f5557
            }),

            gold: new THREE.MeshStandardMaterial({
                color: 0xd4af37
            })
        };

        function box(w, h, d, material) {

            return new THREE.Mesh(
                new THREE.BoxGeometry(w, h, d),
                material
            );
        }

        //
        // ОСНОВНОЙ КОРПУС
        //

        const body = box(
            16,
            5,
            4,
            materials.wall
        );

        body.position.y = 2.5;

        group.add(body);

        //
        // ЦОКОЛЬ
        //

        const base = box(
            16.2,
            1.2,
            4.2,
            materials.base
        );

        base.position.y = 0.6;

        group.add(base);

        //
        // ЦЕНТРАЛЬНЫЙ ВЫСТУП
        //

        const center = box(
            4.5,
            5.5,
            4.3,
            materials.dark
        );

        center.position.set(
            0,
            2.75,
            0.15
        );

        group.add(center);

        //
        // ВХОД
        //

        const entrance = box(
            2.4,
            2.2,
            0.3,
            materials.white
        );

        entrance.position.set(
            0,
            1.3,
            2.2
        );

        group.add(entrance);

        //
        // СТУПЕНИ
        //

        for (let i = 0; i < 4; i++) {

            const step = box(
                3.5 - i * 0.4,
                0.15,
                1 - i * 0.15,
                materials.stone
            );

            step.position.set(
                0,
                0.08 + i * 0.15,
                2.7 + i * 0.05
            );

            group.add(step);
        }

        //
        // КОЛОННЫ
        //

        for (let i = 0; i < 4; i++) {

            const column = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.12,
                    0.12,
                    2.6,
                    16
                ),
                materials.white
            );

            column.position.set(
                -1.2 + i * 0.8,
                4.3,
                2.15
            );

            group.add(column);
        }

        //
        // ПЛОЩАДКА НАД КОЛОННАМИ
        //

        const balcony = box(
            3.5,
            0.25,
            0.6,
            materials.white
        );

        balcony.position.set(
            0,
            5.6,
            2.0
        );

        group.add(balcony);

        //
        // БАШНЯ ПО ЦЕНТРУ
        //

        const tower = box(
            1.8,
            1.8,
            1.8,
            materials.white
        );

        tower.position.set(
            0,
            6.6,
            0
        );

        group.add(tower);

        //
        // ЦЕНТРАЛЬНЫЙ КУПОЛ
        //

        const centerDome = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.9,
                24,
                16,
                0,
                Math.PI * 2,
                0,
                Math.PI / 2
            ),
            materials.dome
        );

        centerDome.position.set(
            0,
            7.5,
            0
        );

        group.add(centerDome);

        //
        // ШПИЛЬ
        //

        const spire = new THREE.Mesh(
            new THREE.ConeGeometry(
                0.08,
                0.6,
                8
            ),
            materials.gold
        );

        spire.position.set(
            0,
            8.1,
            0
        );

        group.add(spire);

        //
        // ЛЕВАЯ УГЛОВАЯ БАШНЯ
        //

        const sideTower = box(
            1.5,
            1.6,
            1.5,
            materials.white
        );

        sideTower.position.set(
            -6.5,
            6.4,
            0
        );

        group.add(sideTower);

        const sideDome = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.75,
                24,
                16,
                0,
                Math.PI * 2,
                0,
                Math.PI / 2
            ),
            materials.dome
        );

        sideDome.position.set(
            -6.5,
            7.2,
            0
        );

        group.add(sideDome);

        const sideSpire = new THREE.Mesh(
            new THREE.ConeGeometry(
                0.06,
                0.5,
                8
            ),
            materials.gold
        );

        sideSpire.position.set(
            -6.5,
            7.7,
            0
        );

        group.add(sideSpire);

        //
        // ПРАВЫЕ ФРОНТОНЫ
        //

        for (let i = 0; i < 3; i++) {

            const roof = new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.7,
                    0.8,
                    3
                ),
                materials.white
            );

            roof.rotation.z = Math.PI;

            roof.position.set(
                4.7 + i * 1.2,
                5.7,
                0
            );

            group.add(roof);
        }

        //
        // ОКНА
        //

        const windowMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xeeeeee
            });

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 12; col++) {

                if (
                    col >= 4 &&
                    col <= 7
                ) continue;

                const win = box(
                    0.3,
                    0.45,
                    0.05,
                    windowMaterial
                );

                win.position.set(
                    -6.5 + col * 1.1,
                    1.8 + row * 1.1,
                    2.05
                );

                group.add(win);
            }
        }

        //
        // ТЕНЬ НА ПОЛ
        //

        group.scale.set(
            0.12,
            0.12,
            0.12
        );

        group.position.y = 0;
    }
});