/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const Pausable = artifacts.require('Pausable.sol');
const utils = require('./helpers/Utils');

contract('Pausable', (accounts) => {
    it('verifies the manager after construction', async () => {
        let contract = await Pausable.new();
        let manager = await contract.manager.call();
        assert.equal(manager, accounts[0]);
    });

    it('should throw when non manager calls Pause function', async () => {
        try {
            let contract = await Pausable.new();
            await contract.pause({ from: accounts[1] });
            assert(true, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies that manager can pause when not paused', async () => {
        let contract = await Pausable.new();
        await contract.pause();
        let paused = await contract.paused.call(); 
        assert.equal(paused, true);
    });

    it('should throw when manager calls Pause function when contract is paused', async () => {
        let contract = await Pausable.new();
        await contract.pause();
        let paused = await contract.paused.call(); 
        try {
            await contract.pause();
            assert(true, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });
});
