"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchContentful } from "@/app/contentful/contentful";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [selectedPart, setSelectedPart] = useState("전체");

  useEffect(() => {
    async function getData() {
      const data = await fetchContentful("notice");
      console.log("Fetched Data:", data); // 데이터 구조 확인
      setNotices(data);
      setFilteredNotices(data);
    }
    getData();
  }, []);

  useEffect(() => {
    if (selectedPart === "전체") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(
        notices.filter((item) => {
          console.log("Item Part2:", item.fields.part2); // 필드값 확인
          return item.fields.part2.includes(selectedPart); // 배열 필터링
        })
      );
    }
  }, [selectedPart, notices]);

  return (
    <div className="notice-container">
      <div className="notice_type">
        {["전체", "학과", "행사", "채용", "기타"].map((part) => (
          <button
            key={part}
            className={selectedPart === part ? "active" : ""}
            onClick={() => setSelectedPart(part)}
          >
            {part}
          </button>
        ))}
      </div>

      <ul className="notice_th">
        <li>분류</li>
        <li>내용</li>
        <li>날짜</li>
      </ul>

      <ul className="notice_list">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((data, index) => (
            <li key={index}>
              <Link href={`/page/notice_view/${index}`}>
                <div className="notice-info">
                  <div>{data.fields.part2.join(", ")}</div> {/* 배열을 문자열로 변환 */}
                  <div>{data.fields.title}</div>
                  <div>{new Date(data.sys.createdAt).toLocaleDateString()}</div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}