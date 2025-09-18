export const Statistics = () => {
  const stats = [
    { label: "Customer Support", value: "24/7"},
    { label: "Deployments", value: "50+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Clients", value: "20+" },
  ];

  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-2xl font-bold text-primary">{s.value}</div>
          <div className="text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
};
