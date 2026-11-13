import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "../../../config";
import axios from "axios";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

function Report({ token }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const totalSales = useMemo(() => {
    return reports.reduce((total, report) => {
      return total + report.quantity;
    }, 0);
  }, [reports]);

  // دریافت گزارش‌ها
  useEffect(() => {
    getReady();
  }, [token]);

  async function getReady() {
    try {
      const response = await axios.get(`${config.urlOfBackend}/api/report`, {
        headers: {
          "x-auth-token": token,
        },
      });

      setReports(response.data.data);
    } catch (error) {
      if (error.response?.status === 400) {
        setReports([]);
      }
    }
    setLoading(false);
  }

  // ساخت نمودار
  useEffect(() => {
    if (!reports.length || !chartRef.current) return;

    // جلوگیری از ساخت نمودار تکراری
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = reports.map((item) => item.category);
    const values = reports.map((item) => item.quantity);

    chartInstance.current = new ChartJS(chartRef.current, {
      type: "doughnut",

      data: {
        labels,
        datasets: [
          {
            data: values,

            backgroundColor: [
              "#3d6fae",
              "#f00000",
              "#91ff00",
              "#fbff10",
              "#ec87dc",
              "#f1880f",
              "#922872",
              "#4bdaf3",
              "#390153",
            ],

            borderColor: "#fff",
            borderWidth: 3,
            hoverOffset: 8,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",

        plugins: {
          legend: {
            position: window.innerWidth <= 600 ? "bottom" : "right",

            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 14,

              font: {
                family: "IranSans",
                size: window.innerWidth <= 400 ? 11 : 13,
              },
            },
          },

          tooltip: {
            rtl: true,

            callbacks: {
              label(context) {
                return `${context.raw} عدد`;
              },
            },
          },
        },
      },
    });

    // پاک‌سازی نمودار هنگام حذف کامپوننت
    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, [reports]);

  // وضعیت دریافت اطلاعات
  if (loading) {
    return <p>در حال دریافت گزارش‌ها...</p>;
  }

  // گزارش خالی
  if (!reports.length) {
    return (
      <div className="empty-reports">
        <h2>هنوز گزارشی برای نمایش نیست</h2>
        <p>
          به محض ثبت اولین فروش، آمار محصولات پرفروش همین‌جا نمایش داده می‌شه.
        </p>
      </div>
    );
  }

  return (
    <section className="reports-page">
      <div className="reports-header">
        <div>
          <h2>گزارش‌ها</h2>
          <p>گزارش فروش محصولات</p>
        </div>

        <div className="reports-total">
          <span>مجموع فروش</span>
          <strong>{totalSales.toLocaleString("fa-IR")} عدد</strong>
        </div>
      </div>

      <div className="reports-chart-wrap">
        <div className="reports-chart-header">
          <div>
            <h3>فروش بر اساس دسته‌بندی</h3>
            <p>سهم هر دسته از مجموع فروش</p>
          </div>
        </div>

        <div className="reports-chart">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <div className="reports-list">
        {reports.map((product, index) => (
          <article className="report-card" key={product.category || index}>
            <div className="report-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>

            <div className="report-info">
              <h3>{product.category}</h3>
              <span>دسته‌بندی محصول</span>
            </div>

            <div className="report-quantity">
              <strong>{product.quantity.toLocaleString("fa-IR")}</strong>
              <span>فروش</span>
            </div>
          </article>
        ))}
      </div>

      <button id="refresh" onClick={refresh}>
        حذف این گزارشات
      </button>
    </section>
  );

  async function refresh() {
    const response = await axios.delete(`${config.urlOfBackend}/api/report`, {
      headers: {
        "x-auth-token": token,
      },
    });

    getReady();
  }
}

export default Report;
