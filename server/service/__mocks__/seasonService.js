const season = 
{
    "_id": "61a61c61867aca50a213d027",
    "seasonNumber": 2,
    "gameweekList": [],
    "date": "2021-11-30T12:43:13.849Z",
    "__v": 0
}

const getSeasonByNumber = async (req, res) => {
    const response = season

    if(response.seasonNumber == req.params.season_number){
        console.log("hi")
        return response
    }
    return ""
};

module.exports = {
    getSeasonByNumber,
};
