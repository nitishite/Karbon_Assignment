from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from rules import (
    latest_financial_index,
    iscr_flag,
    total_revenue_5cr_flag,
    iscr,
    borrowing_to_revenue_flag,
)

app = Flask(__name__)
CORS(app)


def probe_model_5l_profit(data: dict):
    if not isinstance(data, dict) or "financials" not in data:
        raise ValueError(
            "Invalid data format. Expected a dictionary with a 'financials' key."
        )

    latest_financial_index_value = latest_financial_index(data)

    total_revenue_5cr_flag_value = total_revenue_5cr_flag(
        data, latest_financial_index_value
    )

    borrowing_to_revenue_flag_value = borrowing_to_revenue_flag(
        data, latest_financial_index_value
    )

    iscr_flag_value = iscr_flag(data, latest_financial_index_value)

    return {
        "flags": {
            "TOTAL_REVENUE_5CR_FLAG": total_revenue_5cr_flag_value,
            "BORROWING_TO_REVENUE_FLAG": borrowing_to_revenue_flag_value,
            "ISCR_FLAG": iscr_flag_value,
        }
    }


@app.route("/api/probe", methods=["POST"])
def probe():
    try:
        data = request.json
        if not data or "data" not in data:
            return jsonify({"error": "Invalid data format"}), 400

        result = probe_model_5l_profit(data["data"])
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# This is only used when running locally. On Vercel, the server is started automatically.
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
