global.SHADER_MODULE_SHARED_FUNCTION_DECLARATIONS = `

vec3 CalculateOneRay(float x_offset, float y_offset, inout HitInformation hit, inout HitInformation hit_outside);
Ray GenerateRay(float x_offset, float y_offset);
Ray GenerateRayWithPixelOffset(float x_offset, float y_offset);
// x_offset intra pixel offset
// y_offset intra pixel offset
// area_x_start the offset in pixels where this area starts
// area_y_start the offset in pixels where this area starts
// area_width the width of this area
// area_height the height of this area
//Ray GenerateRay(float x_offset, float y_offset, float area_x_start, float area_y_start, float area_width, float area_height);
Ray GenerateRay(float x_offset, float y_offset, int area_index);
GL_CameraData GetActiveCamera();
GL_CameraData GetCameraForArea(int area_index);
vec3 RepositionIntoFundamentalDomain(vec3 position);
void Intersect(Ray ray, inout HitInformation hit, inout HitInformation hit_outside, inout HitInformation hitCube);
void CombineHitInformation(Ray ray, inout HitInformation hit, inout HitInformation hit_outside, inout HitInformation hitCube);
bool CheckOutOfBounds(vec3 position);
vec3 MoveOutOfBoundsTorusRules(vec3 position);
vec3 MoveOutOfBounds(vec3 position);
vec3 MoveOutOfBoundsDirection(vec3 position, vec3 direction);
vec3 MoveOutOfBoundsProjection(vec3 position);
vec3 MoveOutOfBoundsAndGetFlags(vec3 position, inout MoveOutOfBoundsFlags flags);
vec3 ApplyMoveOutOfBoundsFlags(vec3 position, MoveOutOfBoundsFlags flags);
bool IntersectGLAABB(GL_AABB b, Ray r, float ray_local_cutoff, inout float tmin, inout float tmax);
bool IntersectGLAABB(GL_Cylinder cylinder, Ray r, float ray_local_cutoff, inout float tmin, inout float tmax);
bool IntersectGLAABB(Sphere sphere, Ray r, float ray_local_cutoff, inout float tmin, inout float tmax);
void IntersectCylinder(bool dynamic, int part_index, bool check_bounds, Ray ray, float ray_local_cutoff, int lineSegmentID, inout HitInformation hit, bool ignore_override);
void IntersectSphere(bool dynamic, int part_index, bool check_bounds, Ray ray, float ray_local_cutoff, Sphere sphere, inout HitInformation hit, bool copy, int multiPolyID, int type, float velocity, float cost);
float ExtractLinearPercentage(float a, float b, float value);
void RenderFaceIntersections(Ray ray, inout HitInformation hit, vec3 exit);
void RenderFaceIntersection(Ray ray, inout HitInformation hit, vec3 exit, vec3 normal, float abs_a, float abs_b, vec3 color);

//**********************************************************

vec3 Shade(Ray ray, inout HitInformation hit, inout HitInformation hitCube, bool ignore_override, bool allow_fog);
float CalculateFogFactor(float dist);
vec3 GetObjectColor(Ray ray, inout HitInformation hit);

vec3 CalcDirLight(GL_DirLight light, vec3 normal, vec3 viewDir);
vec3 map(vec3 value, vec3 inMin, vec3 inMax, vec3 outMin, vec3 outMax);
vec4 map4(vec4 value, vec4 inMin, vec4 inMax, vec4 outMin, vec4 outMax);

void IntersectUnitCube(Ray ray, inout bool doesIntersect, inout float nearest_t, inout vec3 out_normal);
void IntersectUnitCubeFace(Ray ray, vec3 planeNormal, float planeDistance, inout bool doesIntersect, inout float nearest_t, inout vec3 out_normal);
void IntersectUnitCubeAllSides(Ray ray, inout bool doesIntersect, inout int numberOfIntersections, inout float nearest_t, inout float farthest_t);
void IntersectUnitCubeFace2(Ray ray, vec3 planeNormal, float planeDistance, inout bool doesIntersect, inout int numberOfIntersections, inout float nearest_t, inout float farthest_t);
void HandleOutOfBound_LineSegment(bool dynamic, int part_index, Ray ray, int lineSegmentID, inout HitInformation hitCube);
void HandleOutOfBound_Cylinder(bool dynamic, int part_index, mat4 matrix, float h, inout HitInformation hitCube, bool copy, int multiPolyID, float cost_a, float cost_b);
void HandleOutOfBound_Sphere(bool dynamic, int part_index, Sphere sphere, inout HitInformation hitCube, bool copy, int multiPolyID);
void HandleInside_LineSegment(bool dynamic, int part_index, Ray ray, int lineSegmentID, inout HitInformation hit);
void HandleInside_Cylinder(bool dynamic, int part_index, mat4 matrix, mat4 matrix_inv, float h, inout HitInformation hit, bool copy, int multiPolyID, float cost_a, float cost_b, vec3 position, Ray ray);
void HandleInside_Sphere(bool dynamic, int part_index, Sphere sphere, inout HitInformation hit, bool copy, int multiPolyID, vec3 position, Ray ray);

void IntersectSeeds(Ray ray, float maxRayDistance, inout HitInformation hit);
void IntersectProjectionFrame(bool check_bounds, Ray ray, float ray_local_cutoff, inout HitInformation hit, inout HitInformation hitCube);
void IntersectMovableAxes(Ray ray, float ray_local_cutoff, inout HitInformation hit, inout HitInformation hitCube);
void IntersectAxesCornerAABB(bool check_bounds, Ray ray, float ray_local_cutoff, inout HitInformation hit, inout HitInformation hitCube, int corner_index);
void IntersectCylinder(bool check_bounds, GL_Cylinder cylinder, Ray ray, float ray_local_cutoff, inout HitInformation hit, bool ignore_override);
void IntersectSphereAxis(bool check_bounds, Ray ray, float ray_local_cutoff, Sphere sphere, inout HitInformation hit, int type, vec3 pos_1, vec3 col_1, vec3 pos_2, vec3 col_2, vec3 pos_3, vec3 col_3);
void IntersectAxes(bool check_bounds, Ray ray, float ray_local_cutoff, inout HitInformation hit, inout HitInformation hitCube);

//**********************************************************

void IntersectVolumeInstance(Ray ray, float distance_exit, inout HitInformation hit, inout HitInformation hitCube, inout HitInformation hit_outside);
void BisectRidges(Ray ray, float distance_exit, inout HitInformation hit, inout HitInformation hitCube);
void ApplyVolumeSample(Ray ray, vec3 sample_position, int z_offset, int transfer_function_index, inout HitInformation hit);
vec4 GetVolumeColorAndOpacity(Ray ray, vec3 sample_position, int z_offset, int transfer_function_index);
vec4 GetVolumeColorAndOpacitySmallestEigenvalue(Ray ray, vec3 sample_position, int z_offset, int transfer_function_index);
vec4 GetDirectRidgeVolumeColorAndOpacity(Ray ray, vec3 sample_position, int z_offset, int transfer_function_index);
mat3 BuildJacoby(vec3 sample_jacoby_direction_x, vec3 sample_jacoby_direction_y, vec3 sample_jacoby_direction_z);
mat3 BuildHessian(vec3 sample_jacoby_direction_x, vec3 sample_jacoby_direction_y, vec3 sample_jacoby_direction_z);
mat3 BuildHessianForceSym(vec3 sample_jacoby_direction_x, vec3 sample_jacoby_direction_y, vec3 sample_jacoby_direction_z);

//**********************************************************

vec3 InterpolateVec3(sampler3D texture, vec3 texture_coordinate, int z_offset);
float InterpolateFloat(sampler3D texture, vec3 texture_coordinate, int z_offset);
float GetTubeRadius(int part_index);

//**********************************************************

float GetCost(bool dynamic, int index, int part_index);
vec3 GetPosition(bool dynamic, int index, int part_index);
vec4 GetPosition4D(bool dynamic, int index, int part_index, int ray_projection_index);
float GetVelocity(bool dynamic, int index, int part_index);
GL_LineSegment GetLineSegment(bool dynamic, int index, int part_index);
GL_LineSegment GetLineSegment(bool dynamic, int index, int part_index, int ray_projection_index);
GL_TreeNode GetNode(bool dynamic, int index, int part_index);
GL_AABB GetAABB(bool dynamic, int index, int part_index);
GL_AABB GetAABB(bool dynamic, int index, int part_index, int ray_projection_index);
GL_DirLight GetDirLight(int index);
vec3 GetStreamlineColor(int index);
vec3 GetStreamlineSeedPosition(int index);
vec4 GetScalarColor(int index, int transfer_function_index);
GL_Cylinder GetCylinder(int index);

ivec3 GetIndex3D(int global_index);

//**********************************************************
//                       modules

void RayEulerStep(inout Ray ray);
void RayRK4Step(inout Ray ray);
void RayExplicitStep(inout Ray ray, inout ExplicitIntegrationData explicitIntegrationData);
void LightIntegrationPre(inout Ray ray, inout HitInformation hit, inout ExplicitIntegrationData explicitIntegrationData);
void LightIntegrationPost(inout Ray ray, bool flag_ray_stays_inside, inout ExplicitIntegrationData explicitIntegrationData);

//                       linalg
int mat3eigenvalues(mat3 m, inout vec3 lambda);
bool mat3realEigenvector(mat3 m, float lambda, inout vec3 ev);
bool mat3RidgeEigen(mat3 m, inout float lambda, inout vec3 ev);
bool mat3RidgeEigenNoThreshold(mat3 m, inout float lambda, inout vec3 ev);

//**********************************************************

void Intersect3Sphere(bool dynamic, int part_index, Ray ray, float ray_local_cutoff, Sphere4D sphere4D, inout HitInformation hit, bool copy, int multiPolyID, int type, float velocity, float cost);


vec4 GetOutput(HitInformation hit);
//vec4 GetOutput(Ray ray, inout HitInformation hit);
`;