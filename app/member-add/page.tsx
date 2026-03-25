"use client";

import { useState } from "react";

export default function MemberAdd() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch(
      "https://swcbbl.com/memberAdd.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await res.text();
    alert(text);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-bold mb-6 text-center">
          メンバー登録
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 名前 */}
          <div>
            <label className="text-sm font-medium">名前</label>
            <input
              name="name"
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="山田 太郎"
              required
            />
          </div>

          {/* 生年月日 */}
          <div>
            <label className="text-sm font-medium">生年月日</label>
            <input
              type="date"
              name="birth"
              className="w-full mt-1 p-3 border rounded-lg"
              required
            />
          </div>

          {/* ボタン */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>
      </div>
    </div>
  );
}