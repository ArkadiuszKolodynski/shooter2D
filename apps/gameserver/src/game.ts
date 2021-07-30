import { BodyDef, BodyType, FixtureDef, PolygonShape, World, XY } from '@flyover/box2d';

export class Game {
  public run() {
    const gravity: XY = { x: 0, y: -10 };
    const world = new World(gravity);
    const groundBodyDef = new BodyDef();
    groundBodyDef.position.Set(0, -10);
    const groundBody = world.CreateBody(groundBodyDef);
    const polygonShape = new PolygonShape();
    polygonShape.SetAsBox(50, 10);
    groundBody.CreateFixture(polygonShape, 0);
    const bodyDef = new BodyDef();
    bodyDef.type = BodyType.b2_dynamicBody;
    bodyDef.position.Set(0, 4);
    const body = world.CreateBody(bodyDef);
    const dynamicBox = new PolygonShape();
    dynamicBox.SetAsBox(1, 1);
    const fixtureDef = new FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1;
    fixtureDef.friction = 0.3;
    body.CreateFixture(fixtureDef);

    const timeStep = 1 / 60;
    const velocityIterations = 6;
    const positionIterations = 2;

    for (let i = 0; i < 60; ++i) {
      world.Step(timeStep, velocityIterations, positionIterations);
      const position = body.GetPosition();
      const angle = body.GetAngle();
      console.log(position.x, position.y, angle);
    }
  }
}
