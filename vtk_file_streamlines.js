class VTK_File_Streamlines {

    constructor() {
        this.decimals = 6;
        this.endline = "\n";
        this.export_copies = true;
    }

    SetData(p_ui_seeds, lod_data, part_index) {
        this.p_ui_seeds = p_ui_seeds;
        this.lod_data = lod_data;
        this.p_streamline_context = this.lod_data.p_streamline_context;
        this.raw_data = this.p_streamline_context.GetRawData(part_index);
        this.pointDataVector = this.raw_data.data;
        this.vectorLineSegment = this.lod_data.GetVectorLineSegment(part_index);
        this.lod_data_part = this.lod_data.list_part[part_index];
        this.vectorMultiPolyLines = this.lod_data_part.vectorMultiPolyLines;
        this.GenerateFileContent();
    }

    GetFileContent(){
        return this.content_string;
    }

    GenerateFileContent(){        
        var lines_string = this.GenerateLinesString();
        var num_lines = this.count_num_lines;
        var num_data_in_all_lines = this.count_num_lines + this.count_num_points_in_all_lines;

        var points_string = this.GeneratePointsString();
        //var num_points = this.pointDataVector.length;
        var num_points = this.export_copies ? this.pointDataVector.length : this.count_num_points_in_all_lines;

        this.GeneratePointToColorMapping();
        //var colors_string = this.GenerateColorsString();

        var scalars_string = this.GenerateScalarsString();
        var lookup_table_string = this.GenerateLookupTableString();

        this.content_string = 
        "# vtk DataFile Version 1.0" + this.endline +
        "Exported streamlines" + this.endline +
        "ASCII" + this.endline +
        "DATASET POLYDATA" + this.endline +
        "POINTS " + num_points + " float" + this.endline +
        points_string + this.endline +
        "LINES " + num_lines + " " + num_data_in_all_lines +
        lines_string + this.endline +       
        "POINT_DATA " + num_points + this.endline +  
        //"COLOR_SCALARS colors 3" + this.endline +
        //colors_string;
        "SCALARS ids float" + this.endline +  
        "LOOKUP_TABLE table" + this.endline +  
        scalars_string + this.endline +  

        "LOOKUP_TABLE table "+ this.vectorMultiPolyLines.length + this.endline +  
        lookup_table_string;

        

        console.log("this.pointDataVector", this.pointDataVector);
        console.log("num_points", this.pointDataVector.length);
    }

    GeneratePointsString(){
        var decimals = this.decimals;
        var s = "";
        //for(var i=0; i<this.pointDataVector.length; i++){
        var end = this.export_copies ? this.pointDataVector.length : this.count_num_points_in_all_lines;
        for(var i=0; i<end; i++){
            var value = this.pointDataVector[i].position;
            //s += "[" + i + "] " + value[0].toFixed(decimals) + " " + value[1].toFixed(decimals) + " " + value[2].toFixed(decimals) + this.endline;
            s += value[0].toFixed(decimals) + " " + value[1].toFixed(decimals) + " " + value[2].toFixed(decimals) + this.endline;
        }
        return s;
    }

    GenerateLinesString(){
        this.count_num_lines = 0;
        this.count_num_points_in_all_lines = 0;
        var s = "";
        for(var i=0; i<this.vectorMultiPolyLines.length; i++){
            var multi = this.vectorMultiPolyLines[i];
            for (var j = 0; j < multi.polyLines.length; j++) {
                s += this.endline;
                //s += "[" + this.count_num_lines + "] "
                this.count_num_lines += 1;  
                var poly = multi.polyLines[j];
                s += poly.pointIndices.length;
                for (var k = 0; k < poly.pointIndices.length; k++) {
                    this.count_num_points_in_all_lines += 1;
                    s += " " + poly.pointIndices[k];
                }
            }
        }
        //copies
        if(this.export_copies){
            for(var i=0; i<this.vectorLineSegment.length; i++){
                var segment = this.vectorLineSegment[i];
                var is_copy = segment.copy > 0;
                if(is_copy){
                    this.count_num_lines += 1;
                    this.count_num_points_in_all_lines += 2;
                    s += this.endline + "2 " + segment.indexA + " " + segment.indexB;
                }
            }
        }
        return s;
    }

    GeneratePointToColorMapping(){
        this.dict_point_to_color = {};
        this.dict_point_to_multi_id = {};
        var colors = this.p_ui_seeds.getStreamlineColors();

        //generate a list that returns a vtk usable color string for every id
        var list_id_to_color_strings = [];
        for(var i=0; i<this.vectorMultiPolyLines.length; i++){
            var color_string = colors[i].getStringBlankSeperator();
            list_id_to_color_strings.push(color_string);
        }

        for(var i=0; i<this.vectorMultiPolyLines.length; i++){
            var multi = this.vectorMultiPolyLines[i];
            var multiPolyID = multi.multiPolyID;
            for (var j = 0; j < multi.polyLines.length; j++) {
                var poly = multi.polyLines[j];
                for (var k = 0; k < poly.pointIndices.length; k++) {
                    var pointIndex = poly.pointIndices[k];
                    this.dict_point_to_color[pointIndex] = list_id_to_color_strings[multiPolyID];
                    this.dict_point_to_multi_id[pointIndex] = multiPolyID;
                }
            }
        }

        //copies
        if(this.export_copies){
            for(var i=0; i<this.vectorLineSegment.length; i++){
                var segment = this.vectorLineSegment[i];
                var multiPolyID = segment.multiPolyID;
                var is_copy = segment.copy > 0;
                if(is_copy){
                    this.dict_point_to_multi_id[segment.indexA] = multiPolyID;
                    this.dict_point_to_multi_id[segment.indexB] = multiPolyID;
                }
            }
        }
    }

    /*
    GenerateColorsString(){
        var s = "";
        for(var i=0; i<this.count_num_points_in_all_lines; i++){
            s += this.dict_point_to_color[i] + this.endline;
        }
        return s;
    }
    */

    GenerateScalarsString(){
        var s = "";
        var end = this.export_copies ? this.pointDataVector.length : this.count_num_points_in_all_lines;
        for(var i=0; i<end; i++){
            var id = this.dict_point_to_multi_id[i] === undefined ? 0 : this.dict_point_to_multi_id[i];//fallback to 0 if key not in dict
            s += id / (this.vectorMultiPolyLines.length-1)  + this.endline;
        }
        return s;
    }

    GenerateLookupTableString(){
        var colors = this.p_ui_seeds.getStreamlineColors();
        var s = "";
        //generate a list that returns a vtk usable color string for every id
        for(var i=0; i<this.vectorMultiPolyLines.length; i++){
            var color_string = colors[i].getStringBlankSeperator();
            s += color_string + this.endline;
        }
        return s;
    }

}

module.exports = VTK_File_Streamlines;