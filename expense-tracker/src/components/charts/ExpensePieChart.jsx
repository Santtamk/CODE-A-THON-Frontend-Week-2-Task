
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ExpensesPieChart({ expenses }) {
  // Group expenses by category
  const data = expenses.reduce((acc, expense) => {
    const found = acc.find(item => item.category === expense.category);
    if (found) {
      found.value += expense.price;
    } else {
      acc.push({ category: expense.category, value: expense.price });
    }
    return acc;
  }, []);

  // const totalExpenses = data.reduce((total, item) => total + item.value, 0);

  return (
    <div>
      <h3>Expenses Chart</h3>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
}

export default ExpensesPieChart;
