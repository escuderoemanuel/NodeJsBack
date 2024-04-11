class Enemy {

  constructor() {
    this.stats = {
      equipment: [],
      equipmentWeigth: 0,
      healthPoints: 100,
      attackPower: 5,
      defence: 0
    }

  }

  getStats() {
    const statsToReturn = { ...this.stats };
    //Object.freeze(statsToReturn)
    return statsToReturn;
  }
}

class EnemyDecorator extends Enemy {
  constructor(enemyToDecorate) {
    super();
    this.toDecorate = enemyToDecorate;
  }
}

class SwordDecorator extends EnemyDecorator {
  getStats() {
    const stats = this.toDecorate.getStats()
    stats.attackPower = stats.attackPower + 10,
      stats.equipment = [...stats.equipment, 'sword'],
      stats.equipmentWeigth = stats.equipmentWeigth + 6

    return stats;
  }
}

class ShieldDecorator extends EnemyDecorator {
  getStats() {
    const stats = this.toDecorate.getStats();
    stats.defence = stats.defence + 10,
      stats.equipment = [...stats.equipment, 'shield'],
      stats.equipmentWeigth = stats.equipmentWeigth + 12
    return stats;
  }
}


module.exports = {
  Enemy,
  SwordDecorator,
  ShieldDecorator
}