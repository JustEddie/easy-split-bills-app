class MembersController < ApplicationController
  def new
    @member = Member.new
  end

  def index
    @members = Member.all
    if @members
      render json: {
        status: 200,
        members: @members
      }
    else
      {
        status: 500,
        error: ['members not found']
      }
    end
  end

  def create
    # @user = @project.user
    @member = Member.new(member_params)
    if @member.save
      render json: {
        status: :created
      }
    else
      render json: {
        status: 500,
        errors: @member.errors.full_messages
      }
    end
  end

  def destroy; end

  private

  def member_params
    params.require(:member).permit(:member_name, :email, :project_id)
  end
end
