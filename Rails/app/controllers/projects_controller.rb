class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show edit update destroy]

  # GET /projects or /projects.json
  def index
    @user = User.find_by(id: session[:user_id])
    @projects = @user.projects.all
    if @projects
      render json: {
        projects: @projects
      }
    else
      render json: {
        status: 500,
        errors: ['no projects found']
      }
    end
  end

  # GET /projects/1 or /projects/1.json
  def show
    @project = Project.find(params[:id])
    if @project
      render json: {
        status: 200,
        project: @project
      }
    else
      render json: {
        status: 500,
        errors: ['project not found']
      }
    end
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit; end

  # POST /projects or /projects.json
  def create
    @user = User.find_by(id: session[:user_id])
    @project = @user.projects.new(project_params)

    if @project.save
      render json: {
        status: :created,
        project: @project
      }
    else
      render json: {
        status: 500,
        errors: @project.errors.full_messages
      }
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    # respond_to do |format|
    #   if @project.update(project_params)
    #     format.html { redirect_to project_url(@project), notice: "Project was successfully updated." }
    #     format.json { render :show, status: :ok, location: @project }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @project.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.members.each do |member|
      member.destroy
    end
    @project.destroy

    render json: {
      notice: 'Project was successfully destroyed'
    }

    # respond_to do |format|
    #   format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:title, :user_id, mems: [member: [:member_name]])
  end

end
