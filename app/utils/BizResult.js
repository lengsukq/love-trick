const BizResultCode = require('./BaseResultCode');

/**
 * @author ycx
 * @description 统一返回结果
 */
class BizResult {

    /**
     * 返回code
     */
    code;
    /**
     * 返回消息
     */
    msg;
    /**
     * 返回数据
     */
    data;
    /**
     * 返回时间
     */
    time;

    /**
     *
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @param msg 自定义message
     * @return {BizResult}
     */
    static success(data,msg=BizResultCode.SUCCESS.desc) {
        return new BizResult(BizResultCode.SUCCESS.code, msg, data);
    }

    /**
     * 失败
     */
    static fail(errData,msg=BizResultCode.FAILED.desc) {
        return new BizResult(BizResultCode.FAILED.code, msg, errData);
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param,msg=BizResultCode.VALIDATE_FAILED.desc) {
        return new BizResult(BizResultCode.VALIDATE_FAILED.code, msg, param);
    }
}

module.exports = BizResult
