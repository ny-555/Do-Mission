class MissionsController < ApplicationController
  def index
    missions = Mission.all
    render json: missions
  end
  
  def show
    mission = Mission.find(params[:id])
    render json: mission
  end
  
  def create
    Mission.create(mission_params)
    head :created
  end

  def update
    mission = Mission.find(params[:id])
    mission.update(mission_params) 
    head :created
  end

  def destroy
    mission = Mission.find(params[:id])
    mission.destroy
    head :created
  end
   
  private
 
  def mission_params
    params.require(:mission).permit(:title, :summary, :datetime)
  end
end
