class VTK_File_Streamlines {

    constructor() {
        this.decimals = 6;
        this.endline = "\n";
    }

    SetData(lod_data, part_index) {
        this.lod_data = lod_data;
        this.p_streamline_context = this.lod_data.p_streamline_context;
        this.raw_data = this.p_streamline_context.GetRawData(part_index);
        this.pointDataVector = this.raw_data.data;
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
        var num_points = this.count_num_points_in_all_lines;

        this.content_string = 
        "# vtk DataFile Version 1.0" + this.endline +
        "Exported streamlines" + this.endline +
        "ASCII" + this.endline +
        "DATASET POLYDATA" + this.endline +
        "POINTS " + num_points + " float" + this.endline +
        points_string + this.endline +
        "LINES " + num_lines + " " + num_data_in_all_lines +
        lines_string;

        console.log("this.pointDataVector", this.pointDataVector);
        console.log("num_points", this.pointDataVector.length);
    }

    GeneratePointsString(){
        var decimals = this.decimals;
        var s = "";
        //for(var i=0; i<this.pointDataVector.length; i++){
        for(var i=0; i<this.count_num_points_in_all_lines; i++){
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
        return s;
    }

}

module.exports = VTK_File_Streamlines;