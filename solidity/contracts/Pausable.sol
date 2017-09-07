pragma solidity ^0.4.11;
import './Managed.sol';

/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Managed {
  event Pause();
  event Unpause();

  bool public paused = false;


  /**
   * @dev modifier to allow actions only when the contract IS paused
   */
  modifier whenNotPaused() {
    require(!paused);
    _;
  }

  /**
   * @dev modifier to allow actions only when the contract IS NOT paused
   */
  modifier whenPaused {
    require(paused);
    _;
  }

  /**
   * @dev called by the Manager to pause, triggers stopped state
   */
  function pause() managerOnly whenNotPaused returns (bool) {
    paused = true;
    Pause();
    return true;
  }

  /**
   * @dev called by the Manager to unpause, returns to normal state
   */
  function unpause() managerOnly whenPaused returns (bool) {
    paused = false;
    Unpause();
    return true;
  }
}