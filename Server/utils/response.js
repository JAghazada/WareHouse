class Response {
    constructor(data = null, message = null) {
        this.data = data;
        this.message = message;
    }
    success(res) {
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ? this.message : "Process Successful",
        });
    }
    created(res) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ? this.message : "Process Successful",
        });
    }
    error500(res) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ? this.message : "Error Occured",
        });
    }

    error401(res) {
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ? this.message : "Please Sign in",
        });
    }

    error404(res) {
        return res.status(404).json({
            success: false,
            data: this.data,
            message: this.message ? this.message : "Error Occured",
        });
    }
    error429(res) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ? this.message : "So many requests",
        });
    }
}
module.exports = Response