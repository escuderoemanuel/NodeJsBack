const { Enemy, SwordDecorator, ShieldDecorator } = require("./pattern");


const basicEnemy = new Enemy();
console.log("basicEnemy Stats", basicEnemy.getStats())

const EnemyWithSword = new SwordDecorator(basicEnemy);
console.log("SWORD", EnemyWithSword.getStats())

const EnemyWithSwordAndShield = new ShieldDecorator(EnemyWithSword);
console.log("SHIELD", EnemyWithSwordAndShield.getStats())

const EnemyWithSwordAndShield2 = new SwordDecorator(EnemyWithSwordAndShield);
console.log("SHIELD 2 SWORDS", EnemyWithSwordAndShield2.getStats())