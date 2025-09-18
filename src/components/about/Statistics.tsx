export const Statistics = () => {
  const stats = [
    { label: "Customer Support", value: "24/7" },
    { label: "Deployments", value: "50+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Clients", value: "20+" },
  ];

  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-primary text-2xl font-bold">{s.value}</div>
          <div className="text-muted-foreground text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
};
