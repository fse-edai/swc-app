"use client";

import { useEffect, useState } from "react";

export default function MemberAdd() {
  
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState<any[]>([]);

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

    useEffect(() => {
      fetch("https://swcbbl.com/nxphp/getPart.php")
        .then(res => res.json())
        .then(data => {
          console.log("取得データ:", data); // ←追加
          setParts(data);
        })
        .catch((err) => {
          console.log(err);
          alert("チーム取得エラー");
        });
    }, []);

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
          {/* 部 */}
          <div>
            <label className="text-sm font-medium">部</label>
            <select
              name="partno"
              className="w-full mt-1 p-3 border rounded-lg"
            >
              <option value="">選択してください</option>
              {parts.map((part: any) => (
                <option key={part.partno} value={part.partno}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>

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