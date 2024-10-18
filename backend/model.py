from flask import Flask, request, jsonify
from flask_cors import CORS
from rules import (
    latest_financial_index,
    iscr_flag,
    total_revenue_5cr_flag,
    iscr,
    borrowing_to_revenue_flag,
)
import logging

app = Flask(__name__)
CORS(app, resources={r"/probe": {"origins": "http://localhost:5173"}})

# Configure logging
logging.basicConfig(level=logging.DEBUG)


def probe_model_5l_profit(data: dict):
    app.logger.debug(f"Received data: {data}")

    if not isinstance(data, dict) or "financials" not in data:
        raise ValueError(
            "Invalid data format. Expected a dictionary with a 'financials' key."
        )

    lastest_financial_index_value = latest_financial_index(data)

    total_revenue_5cr_flag_value = total_revenue_5cr_flag(
        data, lastest_financial_index_value
    )

    borrowing_to_revenue_flag_value = borrowing_to_revenue_flag(
        data, lastest_financial_index_value
    )

    iscr_flag_value = iscr_flag(data, lastest_financial_index_value)

    return {
        "flags": {
            "TOTAL_REVENUE_5CR_FLAG": total_revenue_5cr_flag_value,
            "BORROWING_TO_REVENUE_FLAG": borrowing_to_revenue_flag_value,
            "ISCR_FLAG": iscr_flag_value,
        }
    }


@app.route("/probe", methods=["POST"])
def probe():
    try:
        data = request.json
        app.logger.debug(f"Received request data: {data}")

        if not data or "data" not in data:
            return jsonify({"error": "Invalid data format"}), 400

        result = probe_model_5l_profit(data["data"])
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500


if __name__ == "_main_":
    app.run(host="0.0.0.0", port=3000, debug=True)