global.SHADER_MODULE_COMPUTE_BOUNDS = `

bool CheckOutOfBounds(vec3 position)
{    
	for(int i=0; i<3; i++)
	{
		if(position[i] > 1.0)
			return true;
		if(position[i] < 0.0)
			return true;
	}	
	return false;
}

vec3 MoveOutOfBounds(vec3 position)
{
    //MARKER_RULES_TMP done

	//user friendly variables
	float x1 = position.x;
	float x2 = position.y;
	float x3 = position.z;
    //temporary variables so that order of equations does not matter
    float x1_new = x1;
    float x2_new = x2;
    float x3_new = x3;
	
	if(x1 > 1.0)
	{
		x1_new = shader_rule_x_pos_x;
		x2_new = shader_rule_x_pos_y;
		x3_new = shader_rule_x_pos_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}
	else if(x1 < 0.0)
	{
		x1_new = shader_rule_x_neg_x;
		x2_new = shader_rule_x_neg_y;
		x3_new = shader_rule_x_neg_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}

	if(x2 > 1.0)
	{
		x1_new = shader_rule_y_pos_x;
		x2_new = shader_rule_y_pos_y;
		x3_new = shader_rule_y_pos_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}
	else if(x2 < 0.0)
	{
		x1_new = shader_rule_y_neg_x;
		x2_new = shader_rule_y_neg_y;
		x3_new = shader_rule_y_neg_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}

	if(x3 > 1.0)
	{
		x1_new = shader_rule_z_pos_x;
		x2_new = shader_rule_z_pos_y;
		x3_new = shader_rule_z_pos_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}
	else if(x3 < 0.0)
	{
		x1_new = shader_rule_z_neg_x;
		x2_new = shader_rule_z_neg_y;
		x3_new = shader_rule_z_neg_z;
		x1 = x1_new;
		x2 = x2_new;
		x3 = x3_new;
	}

	return vec3(x1,x2,x3);
}

vec3 MoveOutOfBoundsDirection(vec3 position, vec3 direction)
{    
    //MARKER_RULES_TMP done
    //user friendly variables
	float x1 = position.x;
	float x2 = position.y;
	float x3 = position.z;
	float v1 = direction.x;
	float v2 = direction.y;
	float v3 = direction.z;    
    //temporary variables so that order of equations does not matter
    float v1_new = v1;
    float v2_new = v2;
    float v3_new = v3;

	if(x1 > 1.0)
	{
		v1_new = shader_rule_x_pos_u;
		v2_new = shader_rule_x_pos_v;
		v3_new = shader_rule_x_pos_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}
	else if(x1 < 0.0)
	{
		v1_new = shader_rule_x_neg_u;
		v2_new = shader_rule_x_neg_v;
		v3_new = shader_rule_x_neg_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}

	if(x2 > 1.0)
	{
		v1_new = shader_rule_y_pos_u;
		v2_new = shader_rule_y_pos_v;
		v3_new = shader_rule_y_pos_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}
	else if(x2 < 0.0)
	{
		v1_new = shader_rule_y_neg_u;
		v2_new = shader_rule_y_neg_v;
		v3_new = shader_rule_y_neg_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}

	if(x3 > 1.0)
	{
		v1_new = shader_rule_z_pos_u;
		v2_new = shader_rule_z_pos_v;
		v3_new = shader_rule_z_pos_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}
	else if(x3 < 0.0)
	{
		v1_new = shader_rule_z_neg_u;
		v2_new = shader_rule_z_neg_v;
		v3_new = shader_rule_z_neg_w;
		v1 = v1_new;
		v2 = v2_new;
		v3 = v3_new;
	}

	return vec3(v1,v2,v3);
}

`;