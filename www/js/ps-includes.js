
/*
 * Support for CodeTheWave Framework. Move into any codepens when needed
 */

/*
 * spawn function$
 * PIXI, from SP
 * 
 * input, from SP
 * 
 * texture, the PIXI texture object to use
 * 
 * params:
 *      duration: float -> how long a spawned object lives, If omitted, it's permanent'
 *      mirrored: boolean -> if we should spawn a mirrored
 *      x, y: float ->, if omitted, random position
 *      size: float -> size of object in pixels (if omitted will get size from texture)
 *      animate: boolean -> animate in and out?
 *      container: PIXI Display Container. Optional, fallback to input.container
 *      inDuration, outDuration: float -> normalized duration as pct of duration (0-1)
 *      easeIn, easeOut: TweenMax easing functions, using Power2 if omitted
 */

SPHelpers = {};

SPHelpers.spawn = function(PIXI, input, texture, params)
{
    var spawnee = new PIXI.Sprite(texture);
    spawnee.anchor.set(0.5);
    spawnee.rotation = Math.random() * 2 * Math.PI;
    spawnee.x = ("x" in params) ? params.x : Math.random() * input.width;
    spawnee.y = ("y" in params) ? params.y : Math.random() * input.height;

    var spawneeMirrored = null;
    if(("mirrored" in params))
    {
        if(params.mirrored == true)
        {
            console.log("mirrored spawn")
        }
    }

    if(("size" in params))
    {
        var aspect = texture.width / texture.height;
        if (aspect > 1)
        {
            spawnee.width = params.size;
            spawnee.height = params.size / aspect;
        }
        else
        {
            spawnee.height = params.size;
            spawnee.width = params.size * aspect;
        }
    }

    if(("container" in params))
    {
        params.container.addChild(spawnee);
    }
    else
    {
        input.container.addChild(spawnee);
    }

    if(("animate" in params))
    {
        if(params.animate == true)
        {
            spawnee.alpha = 0;
            var duration = ("duration" in params) ? params.duration : -1.0;
            var inDuration = ("inDuration" in params) ? params.inDuration : 0.25; //0-1
            var outDuration = ("outDuration" in params) ? params.outDuration : 0.25;//0-1

            //TweenMax.to(spawnee, 0.5, {alpha:1});
            animationParams = duration > 0 ? {onComplete:SPHelpers.destroySpawnee, onCompleteParams:[spawnee]} : {}
            var alphaTimeline = new TimelineMax(animationParams);
            alphaTimeline.to(spawnee, inDuration,{alpha:1})
            if (duration > 0)
            {
                alphaTimeline.to(spawnee, outDuration, {delay:1 - outDuration, alpha:0})
                alphaTimeline.duration(duration);
            }

            if(("startScale" in params))
            {
                var startScale = params.startScale;
                var targetScale = spawnee.scale.x;
                var easeIn = ("easeIn" in params) ? params.easeIn : Power2.easeOut;
                var easeOut = ("easeOut" in params) ? params.easeOut : Power2.easeIn;
                
                spawnee.scale.x = spawnee.scale.y = targetScale * startScale;

                var scaleTimeline = new TimelineMax(animationParams);
                scaleTimeline.to(spawnee.scale, inDuration,{x:targetScale, y:targetScale, ease: easeIn})
                if (duration > 0)
                {
                    scaleTimeline.to(spawnee.scale, outDuration, {delay:1 - outDuration, x:targetScale * startScale, y:targetScale * startScale, ease: easeOut})
                    scaleTimeline.duration(duration);
                }
            }
        }
    }

    return spawnee;
}

SPHelpers.destroySpawnee = function(spawnee)
{
    if (!spawnee.parent)
    {
        return;
    }
    spawnee.parent.removeChild(spawnee);
}

SPHelpers.Vector2 = function(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};

SPHelpers.Vector2.prototype.x = null;
SPHelpers.Vector2.prototype.y = null;
SPHelpers.Vector2.prototype.add = function (v) {
    return new SPHelpers.Vector2(this.x + v.x, this.y + v.y);
};
SPHelpers.Vector2.prototype.clone = function () {
    return new SPHelpers.Vector2(this.x, this.y);
};
SPHelpers.Vector2.prototype.distance = function (v) {
    var x = this.x - v.x;
    var y = this.y - v.y;
    return Math.sqrt(x * x + y * y);
};
SPHelpers.Vector2.prototype.equals = function (toCompare) {
    return this.x == toCompare.x && this.y == toCompare.y;
};
SPHelpers.Vector2.prototype.interpolate = function (v, f) {
    return new SPHelpers.Vector2((this.x + v.x) * f, (this.y + v.y) * f);
};
SPHelpers.Vector2.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
SPHelpers.Vector2.prototype.sqrLength = function () {
    return this.x * this.x + this.y * this.y;
};
SPHelpers.Vector2.prototype.normalize = function (thickness = 1) {
    var l = this.length();
    this.x = this.x / l * thickness;
    this.y = this.y / l * thickness;
};
SPHelpers.Vector2.prototype.offset = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};
SPHelpers.Vector2.prototype.subtract = function (v) {
    return new SPHelpers.Vector2(this.x - v.x, this.y - v.y);
};
SPHelpers.Vector2.prototype.toString = function () {
    return "(x=" + this.x + ", y=" + this.y + ")";
};
SPHelpers.Vector2.interpolate = function (pt1, pt2, f) {
    return new SPHelpers.Vector2((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
};
SPHelpers.Vector2.distance = function (pt1, pt2) {
    var x = pt1.x - pt2.x;
    var y = pt1.y - pt2.y;
    return Math.sqrt(x * x + y * y);
};

SPHelpers.SpriteAnimator = function(sprite)
{
    this.sprite = sprite || null;
};

SPHelpers.SpriteAnimator.prototype.sprite = null;
SPHelpers.SpriteAnimator.prototype.speed = 0;
SPHelpers.SpriteAnimator.prototype.maxSpeed = 0;
SPHelpers.SpriteAnimator.prototype.acceleration = 0;
SPHelpers.SpriteAnimator.prototype.rotationSpeed = 0;
SPHelpers.SpriteAnimator.prototype.direction = new SPHelpers.Vector2(0,0);
SPHelpers.SpriteAnimator.prototype.update = function(deltaTime)
{
    this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    this.sprite.x += this.direction.x * this.speed;
    this.sprite.y += this.direction.y * this.speed;
    this.sprite.rotation += this.rotationSpeed;
};

