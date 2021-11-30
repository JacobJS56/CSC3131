const seasonService = require('../service/seasonService');

describe('team service', () => {
    test('gets back all seasons', () => {
        const response = seasonService.getAllSeasons();

        expect(response.length).toEqual(4)
    });
})