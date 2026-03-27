"use client";

import { useEffect, useState } from "react";

export default function MemberAdd() {

  const [parts, setParts] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedPart, setSelectedPart] = useState("");

  useEffect(() => {
    fetch("https://swcbbl.com/nxphp/getPart.php")
      .then(res => res.json())
      .then(data => setParts(data));
  }, []);

  const handlePartChange = (e: any) => {
    const partno = e.target.value;
    setSelectedPart(partno);

    if (!partno) {
      setTeams([]);
      return;
    }

    fetch(`https://swcbbl.com/nxphp/getTeamByPartno.php?partno=${partno}`)
      .then(res => res.json())
      .then(data => setTeams(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">

        <h1 className="text-xl font-bold text-center">選手追加登録</h1>

        {/* 申請者 */}
        <div>
          <label className="text-sm text-gray-600">申請者</label>
          <input
            name="member_name"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* 部 */}
        <div>
          <label className="text-sm text-gray-600">部</label>
          <select
            name="partno"
            onChange={handlePartChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">選択してください</option>
            {parts.map((part: any) => (
              <option key={part.partno} value={part.partno}>
                {part.name}
              </option>
            ))}
          </select>
        </div>

        {/* チーム */}
        <div>
          <label className="text-sm text-gray-600">チーム</label>
          <select
            name="teamno"
            className="w-full p-3 border rounded-lg"
          >
            <option value="">先に部を選んでください</option>

          {teams.map((t: any, index) => (
            <option key={index} value={t.teamno}>
              {t.name}
            </option>
          ))}
          </select>
        </div>

        {/* 名前 */}
        <div>
          <label className="text-sm text-gray-600">選手名</label>
          <input
            name="member_name"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* 生年月日 */}
        <div>
          <label className="text-sm text-gray-600">生年月日</label>
          <input
            type="date"
            name="birthday"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 補足 */}
        <div>
          <label className="text-sm text-gray-600">補足(大学名/国籍等/チーム名)</label>
          <input
            name="member_name"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* ボタン */}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600">
          登録する
        </button>

      </div>
    </div>
  );
}