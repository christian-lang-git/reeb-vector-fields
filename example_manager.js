class ExampleManager {
    constructor() {
        this.block_all_input = false;     
        this.InitButtons();   
    }

    Link(visibility_manager, hide_manager){
        this.visibility_manager = visibility_manager;
        this.hide_manager = hide_manager;
    }

    DeactivateInput(){
        this.block_all_input = true;
    }

    ActivateInput(){
        this.block_all_input = false;
    }

    InitButtons(){
        document.getElementById("button_open_dialog_load").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            document.getElementById("wrapper_dialog_load_field").className = "wrapper";
        });
        document.getElementById("button_dialog_load_cancel").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            document.getElementById("wrapper_dialog_load_field").className = "hidden";
        });

        document.getElementById("fieldset_load_magnetic_field").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetMagneticField");
            this.SetMagneticField();
        });

        document.getElementById("fieldset_load_double_pndulum").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetMagneticField");
            this.SetDoublePendulum();
        });
        
        document.getElementById("fieldset_load_example_1").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample1");
            this.SetExample1();
        });

        document.getElementById("fieldset_load_example_2").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample2");
            this.SetExample2();
        });

        document.getElementById("fieldset_load_example_3").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample3");
            this.SetExample3();
        });

        document.getElementById("fieldset_load_example_4").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample4");
            this.SetExample4();
        });
        
        document.getElementById("fieldset_load_example_5").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample5");
            this.SetExample5();
        });

        document.getElementById("fieldset_load_example_6").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample6");
            this.SetExample6();
        });
        
        document.getElementById("fieldset_load_example_7").addEventListener("click", (event) => {
            if(this.block_all_input){
                return;
            }
            console.log("onClickSetExample7");
            this.SetExample7();
        });
    }

    SetMagneticField(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "cos(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x3)";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetDoublePendulum(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_2_PLUS_2D;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_SECOND_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_a").value = "sin(4*PI*(x1-x2))/(2*(cos(2*PI*(x1-x2))-2))*v1*v1-sin(2*PI*(x1-x2))/(2-cos(2*PI*(x1-x2)))*v2*v2";
        document.getElementById("input_field_equation_b").value = "-2*sin(2*PI*(x1-x2))/(2-cos(2*PI*(x1-x2)))*v1*v1-sin(4*PI*(x1-x2))/(2*(cos(2*PI*(x1-x2))-2))*v2*v2";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample1(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "cos(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x3)";
        document.getElementById("input_field_equation_w").value = "0";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample2(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "cos(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x3)";
        document.getElementById("input_field_equation_w").value = "1";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample3(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "cos(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x3)";
        document.getElementById("input_field_equation_w").value = "cos(2*PI*x1)";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample4(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "cos(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x3)";
        document.getElementById("input_field_equation_w").value = "sin(2*PI*x1)+cos(2*PI*x2)";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample5(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_TORUS;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_QUOTIENT_SPACE;
        document.getElementById("select_data_order").value = DATA_ORDER_FIRST_ORDER;
        this.SetLightTransportLinear();
        this.SetDuplicatorOnce();
        document.getElementById("input_field_equation_u").value = "2*sin(2*PI*x3)";
        document.getElementById("input_field_equation_v").value = "sin(2*PI*x2)+2*cos(2*PI*x3)";
        document.getElementById("input_field_equation_w").value = "cos(2*PI*x1)";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }
  
    SetExample6(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_SPHERE_4_PLUS_4D;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_IMPLICIT;
        document.getElementById("select_data_order").value = DATA_ORDER_SECOND_ORDER;
        this.SetLightTransport3Sphere();
        this.SetDuplicatorOff();
        document.getElementById("input_field_equation_p0").value = "v1";
        document.getElementById("input_field_equation_p1").value = "v2";
        document.getElementById("input_field_equation_p2").value = "v3";
        document.getElementById("input_field_equation_p3").value = "v4";
        document.getElementById("input_field_equation_d0").value = "-x1";
        document.getElementById("input_field_equation_d1").value = "-x2";
        document.getElementById("input_field_equation_d2").value = "-x3";
        document.getElementById("input_field_equation_d3").value = "-x4";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetExample7(){
        //MARKER_RENAME_SYMBOLS
        document.getElementById("select_space").value = SPACE_3_SPHERE_4_PLUS_4D;
        document.getElementById("select_manifold_type").value = MANIFOLD_TYPE_IMPLICIT;
        document.getElementById("select_data_order").value = DATA_ORDER_SECOND_ORDER;
        this.SetLightTransport3Sphere();
        this.SetDuplicatorOff();
        document.getElementById("input_field_equation_parameter_s").value = "0.5";
        document.getElementById("input_field_equation_p0").value = "v1";
        document.getElementById("input_field_equation_p1").value = "v2";
        document.getElementById("input_field_equation_p2").value = "v3";
        document.getElementById("input_field_equation_p3").value = "v4";
        document.getElementById("input_field_equation_d0").value = "-s*v2-(1-s*delta)*x1";
        document.getElementById("input_field_equation_d1").value = "s*v1-(1-s*delta)*x2";
        document.getElementById("input_field_equation_d2").value = "-s*v4-(1-s*delta)*x3";
        document.getElementById("input_field_equation_d3").value = "s*v3-(1-s*delta)*x4";
        document.getElementById("wrapper_dialog_load_field").className = "hidden";
        this.UpdateVisibility();
    }

    SetLightTransport3Sphere(){    
        //MARKER_RENAME_SYMBOLS            
        document.getElementById("select_light_integrator_type").value = LIGHT_INTEGRATOR_RK4;
        document.getElementById("input_field_light_transport_p0").value = "v1";
        document.getElementById("input_field_light_transport_p1").value = "v2";
        document.getElementById("input_field_light_transport_p2").value = "v3";
        document.getElementById("input_field_light_transport_p3").value = "v4";
        document.getElementById("input_field_light_transport_d0").value = "-x1";
        document.getElementById("input_field_light_transport_d1").value = "-x2";
        document.getElementById("input_field_light_transport_d2").value = "-x3";
        document.getElementById("input_field_light_transport_d3").value = "-x4";
    }

    SetLightTransportLinear(){                
        document.getElementById("select_light_integrator_type").value = LIGHT_INTEGRATOR_LINE;
    }

    SetDuplicatorOff(){                
        document.getElementById("segment_duplicator_iterations").value = "0";
    }

    SetDuplicatorOnce(){                
        document.getElementById("segment_duplicator_iterations").value = "1";
    }

    UpdateVisibility(){
        this.visibility_manager.UpdateVisibility();
        this.hide_manager.UpdateVisibility();
    }
}


module.exports = ExampleManager;